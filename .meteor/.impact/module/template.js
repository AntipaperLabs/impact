require('sugar');

var handlebars = require('handlebars');

// this code is from meteor package handlebars, parse.js
var to_json_ast = function (code) {

  var ast = handlebars.parse(code);

  // Recreate Handlebars.Exception to properly report error messages
  // and stack traces. (https://github.com/wycats/handlebars.js/issues/226)
  //makeHandlebarsExceptionsVisible(handlebars);

  var identifier = function (node) {
    if (node.type !== "ID")
      throw new Error("got ast node " + node.type + " for identifier");
    // drop node.isScoped. this is true if there was a 'this' or '.'
    // anywhere in the path. vanilla handlebars will turn off
    // helpers lookup if isScoped is true, but this is too restrictive
    // for us.
    var ret = [node.depth];
    // we still want to turn off helper lookup if path starts with 'this.'
    // as in {{this.foo}}, which means it has to look different from {{foo}}
    // in our AST.  signal the presence of 'this' in our AST using an empty
    // path segment.
    if (/^this\./.test(node.original))
      ret.push('');
    return ret.concat(node.parts);
  };

  var value = function (node) {
    // Work around handlebars.js Issue #422 - Negative integers for
    // helpers get trapped as ID. handlebars doesn't support floating
    // point, just integers.
    if (node.type === 'ID' && /^-\d+$/.test(node.string)) {
      // Reconstruct node
      node.type = 'INTEGER';
      node.integer = node.string;
    }

    var choices = {
      ID: function (node) {return identifier(node);},
      STRING: function (node) {return node.string;},
      INTEGER: function (node) {return +node.integer;},
      BOOLEAN: function (node) {return (node.bool === 'true');}
    };
    if (!(node.type in choices))
      throw new Error("got ast node " + node.type + " for value");
    return choices[node.type](node);
  };

  var hash = function (node) {
    if (node.type !== "hash")
      throw new Error("got ast node " + node.type + " for hash");
    var ret = {};
    node.pairs.each(function (p) {
      ret[p[0]] = value(p[1]);
    });
    return ret;
  };

  var invocation = function (node) {
    if (node.type !== "mustache")
      throw new Error("got ast node " + node.type + " for invocation");
    var ret = [node.id];
    ret = ret.concat(node.params);
    ret = ret.map(value);
    if (node.hash)
      ret.push(hash(node.hash));
    return ret;
  };

  var template = function (nodes) {
    var ret = [];

    if (!nodes)
      return [];

    var choices = {
      mustache: function (node) {
        ret.push([node.escaped ? '{' : '!', invocation(node)]);
      },
      partial: function (node) {
        var id = identifier(node.id);
        if (id.length !== 2 || id[0] !== 0)
          // XXX actually should just get the literal string the
          // entered, and avoid identifier parsing
          throw new Error("Template names shouldn't contain '.' or '/'");
        var x = ['>', id[1]];
        if (node.context)
          x = ['#', [[0, 'with'], identifier(node.context)], [x]];
        ret.push(x);
      },
      block: function (node) {
        var x = ['#', invocation(node.mustache),
                 template(node.program.statements)];
        if (node.program.inverse)
          x.push(template(node.program.inverse.statements));
        ret.push(x);
      },
      inverse: function (node) {
        ret.push(['#', invocation(node.mustache),
                  node.program.inverse &&
                  template(node.program.inverse.statements) || [],
                  template(node.program.statements)]);
      },
      content: function (node) {ret.push(node.string);},
      comment: function (node) {}
    };

    nodes.each(function (node) {
      if (!(node.type in choices))
        throw new Error("got ast node " + node.type + " in template");
      choices[node.type](node);
    });

    return ret;
  };

  if (ast.type !== "program")
    throw new Error("got ast node " + node.type + " at toplevel");
  return template(ast.statements);
};
/*
var makeHandlebarsExceptionsVisible = function (handlebars) {
  handlebars.Exception = function(message) {
    this.message = message;
    // In Node, if we don't do this we don't see the message displayed
    // nor the right stack trace.
    Error.captureStackTrace(this, arguments.callee);
  };
  handlebars.Exception.prototype = new Error();
  handlebars.Exception.prototype.name = 'Handlebars.Exception';
};
*/

// this is etirely based on meteor's html_scanner.scan method
/*
  contents      - string with source code
  source_name   - source code filename
  module_name   - name for module
*/
exports.compile = function (contents, source_name, module_name) {
  var rest = contents;
  var index = 0;

  var advance = function(amount) {
    rest = rest.substring(amount);
    index += amount;
  };

  var parseError = function(msg) {
    var lineNumber = contents.substring(0, index).split('\n').length;
    var line = contents.split('\n')[lineNumber - 1];
    var info = "line "+lineNumber+", file "+source_name + "\n" + line;
    return new Error((msg || "Impact Template parse error")+" - "+info);
  };

  var results  = '';
  var rOpenTag = /^((<(template)\b)|$)/i;

  while (rest) {
    // skip whitespace first (for better line numbers)
    advance(rest.match(/^\s*/)[0].length);

    var match = rOpenTag.exec(rest);
    if (! match)
      throw parseError(); // unknown text encountered

    var matchToken = match[1];
    var matchTokenTagName = match[3];
    
    advance(match.index + match[0].length);

    if (! matchToken)
      break; // matched $ (end of file)

    // otherwise, a <tag>
    var tagName = matchTokenTagName.toLowerCase();
    var tagAttribs = {}; // bare name -> value dict
    var rTagPart = /^\s*((([a-zA-Z0-9:_-]+)\s*=\s*(["'])(.*?)\4)|(>))/;
    var attr;
    // read attributes
    while ((attr = rTagPart.exec(rest))) {
      //----------------------------------
      var attrToken = attr[1];
      var attrKey = attr[3];
      var attrValue = attr[5];
      advance(attr.index + attr[0].length);
      if (attrToken === '>')
        break;
      // XXX we don't HTML unescape the attribute value
      // (e.g. to allow "abcd&quot;efg") or protect against
      // collisions with methods of tagAttribs (e.g. for
      // a property named toString)
      attrValue = attrValue.match(/^\s*([\s\S]*?)\s*$/)[1]; // trim
      tagAttribs[attrKey] = attrValue;
    }
    if (! attr) // didn't end on '>'
      throw new parseError("Parse error in tag");
    // find </tag>
    var end = (new RegExp('</'+tagName+'\\s*>', 'i')).exec(rest);
    if (! end)
      throw new parseError("unclosed <"+tagName+">");
    var tagContents = rest.slice(0, end.index);

    advance(end.index + end[0].length);
    // -------- handle Tag ------------

    // trim the tag contents
    tagContents = tagContents.match(/^[ \t\r\n]*([\s\S]*?)[ \t\r\n]*$/)[1];

    var name = tagAttribs.name;
    if (!name)
      throw parseError("Template has no 'name' attribute");

    var prefix = module_name + '-';
    // add prefixes to all partials used in this template
    tagContents = tagContents.replace(/{{>\s?(\w+)}}/, function (match, partial) {
      return '{{> ' + prefix + partial + '}}';
    });

    // prefix this template with module_name
    name = prefix + name;

    var code = 'Handlebars.json_ast_to_func(' +
      JSON.stringify(to_json_ast(tagContents)) + ')';
    
    results += "Meteor._def_template(" + JSON.stringify(name) + "," + code + ");\n";
  }

  return results;
};

