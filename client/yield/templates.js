


  Impact._def_template = function (name, template, prefix) {
    prefix = prefix || '';
    //-------- recursion ------------
    var traverse = function (array) {
      if (array[0] === ">") {
        array[1] = prefix + array[1];
      } else {
        array.each(function (node) {
          if (node instanceof Array)
            traverse(node);
        });
      }
    };
    // console.log("TEMPLATE PREIX = ", prefix);
    // add prefix to all partial calls
    if (prefix)
      traverse(template);
    // this is a little hacky but without doing this,
    // Meteor won't let us reload the templates
    // on the other hand this causes nasty errors :(
    // what can we do ?
    // for now we deal with this by using unique prefixes
    // delete Template[prefix+name];
    // install this template in Meteor
    Meteor._def_template(prefix + name, Handlebars.json_ast_to_func(template));
  }

