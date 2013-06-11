/* Compile JSTEMPLATE files */

var fs = require('fs');


exports.fillTemplate = function(template, source) {

  /* Read template source*/
  var code = fs.readFileSync(__dirname + '/' + template + '.jstemplate', 'utf8');

  /* Replace "##<# arg #>##" with source.arg */
  return code.replace(/##<#([^#]*)#>##/g, function() {  
    return eval('with(source){' + arguments[1] + '};');   /* This trick is here so that we can easily.use.dots */
  });
};