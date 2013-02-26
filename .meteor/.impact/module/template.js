
// this is etirely based on meteor's html_scanner.scan method
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
    tagContents.replace(/^{{>\s?(\w+)}}$/, function (match, partial) {
      return '{{> ' + prefix + partial + '}}';
    });

    // prefix this template with module_name
    name = prefix + name;

    var code = 'Handlebars.json_ast_to_func(' +
      JSON.stringify(Handlebars.to_json_ast(tagContents)) + ')';
    
    results += "Meteor._def_template(" + JSON.stringify(name) + "," + code + ");\n";
  }

  return results;
};

