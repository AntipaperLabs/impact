var fs = require('fs');


var fillTemplate = function(template) {
  // console.log("FILENAME",__filename);
  // console.log("DIR-NAME", __dirname);
                // var code = fs.readFileSync(__dirname + '/' + template + '.jstemplate', 'utf8');
                // var
                // return code.replace(/##<#([^#]*)#>##/g, function() {
                //   return eval("with(this){"+arguments[1]+"};");
                //   // return "(("+arguments[1]+"))";
                //   // var ret = "";
                //   // ret += "\n\n\n----BEGIN----\n";
                //   // for(var i = 0; i < arguments.length; ++i) {
                //   //   ret += '' + arguments[i] + "\n----\n";
                //   // }
                //   // ret += "\n----END-----\n\n\n";
                //   // return ret;
                // });
  // return code;
  // return ";
};

exports.fillTemplate = function(template, source) {
  // return fillTemplate.call(source, template);
  var code = fs.readFileSync(__dirname + '/' + template + '.jstemplate', 'utf8');
  return code.replace(/##<#([^#]*)#>##/g, function() {
    return eval("with(source){"+arguments[1]+"};");
  });
};