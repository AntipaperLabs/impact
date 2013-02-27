require('sugar');

var fs = require('fs');
var fsx = require('../fsx');
var proc = require('child_process');
var handlebars = require('./template.js');


var CODE_ROOT = '.meteor/impact/modules/';
var CODE_ROOT_LENGTH = CODE_ROOT.length;

var DEV_ROOT = 'public/-/m/';
var URL_ROOT = '/-/m/';


var COMMENT_FILE_BREAK = "\n////////////////////////////////////////\n";



var compileFile = function(path, source) {
  if(!(path.endsWith('.js') || path.endsWith('.html'))) return;

  var filename = path.substring(CODE_ROOT_LENGTH);
  var code = fs.readFileSync(path, 'utf8');
  var header = "\n" + COMMENT_FILE_BREAK +
               "// "+ filename +
               COMMENT_FILE_BREAK + "\n\n\n";
  var tailer = "\n\n\n\n";

  if(path.endsWith('.js')) {
    appendSource(source, header + code + tailer);
  } else
  if(path.endsWith('.html')) {
    code = handlebars.compile(code, filename);
    prependSource(source, code + "\n");
  }

}

var compileDirectory = function(path, source) {//function(moduleName, directory, list) {
  var dirName = path.substring(CODE_ROOT_LENGTH);
  fs.readdirSync(path).forEach(function(fileLastName) {
    var filename = path + '/' + fileLastName;
    if(fs.statSync(filename).isDirectory()) {
      compileDirectory(filename, source);
      // makeDirectory(moduleName, filename, list);
    } else {
      compileFile(filename, source);
      // makeFile(moduleName, filename, list);
    }
  });
}

var appendSource = function(source, code) {
  source.text += code;
};

var prependSource = function(source, code) {
  source.text = code + source.text;
};

var createSource = function() {
  return {text: ''};
};

var packSource = function(source, name) {
  prependSource(source, "(function(){\n");

  source.text += "\n\n" + COMMENT_FILE_BREAK;
  source.text += "Impact.loadedModuleConstructor('"+name+"');";
  source.text += "\n\n";

  appendSource(source, "\n})();\n");
};




exports.make = function(name) {
  var list = [];


  var source = createSource();
  // openSource(source, name);
  compileDirectory(CODE_ROOT + name, source);
  packSource(source, name);

  // makeDirectory(name, CODE_ROOT + name, );

  // var dev = "";
  // list.forEach(function(file){
  //   dev += "require(" +
  //          "['" + file + "']," +
  //          "function(){\n";
  // });
  // dev += "console.log('MODULE LOADED: ["+name+"]');\n";
  // dev += "Impact.loadedModuleConstructor('"+name+"');\n";
  // list.forEach(function(file){
  //   dev += "});";
  // });
  // dev += "\n";

  fs.writeFile(DEV_ROOT + name + ".js", source.text);
}

