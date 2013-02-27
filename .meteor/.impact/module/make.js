require('sugar');
require('../lib/oop.js');

var fs = require('fs');
var fsx = require('../fsx');
var proc = require('child_process');
var handlebars = require('./template.js');


var CODE_ROOT = '.meteor/impact/modules/';
var CODE_ROOT_LENGTH = CODE_ROOT.length;

var DEV_ROOT = 'public/-/m/';
var URL_ROOT = '/-/m/';


var COMMENT_FILE_BREAK = "\n////////////////////////////////////////\n";


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


var Source = function(name) {
  this.name = name;
  this.templates = '';
  this.constructor = '';
};

$functions(Source, {
  addCode: function(text) {
    this.constructor += text;
  },
  addTemplates: function(text) {
    this.templates += text;
  },
  output: function() {
    var ret = '';

    ret += "(function(){\n\n";                                        // OPEN #1
    ret += "Impact.loadModuleConstructor('"+this.name+"',{\n";        // OPEN #2

    ret += "templates: {\n\n";
    ret += this.templates;
    ret += "\n},\n\n";

    ret += "loader: function(exports, Name, S, Templates, Documents, Versions, Comments) {\n\n";
    ret += this.constructor;
    ret += "\n},\n\n";


    ret += "});\n";                                                   // CLOSE #2
    ret += "\n})();\n";                                               // CLOSE #1
    ret += "console.log('END OF FILE REACHED');\n";
    return ret;
  },
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

var compileFile = function(path, source) {
  if(!(path.endsWith('.js') || path.endsWith('.html'))) return;

  var filename = path.substring(CODE_ROOT_LENGTH);
  var code = fs.readFileSync(path, 'utf8');
  var header = "\n" + COMMENT_FILE_BREAK +
               "// "+ filename +
               COMMENT_FILE_BREAK + "\n\n\n";
  var tailer = "\n\n\n\n";

  if(path.endsWith('.js')) {
    source.addCode(header + code + tailer);
  } else
  if(path.endsWith('.html')) {
    code = handlebars.compile(code, filename);
    source.addTemplates(code + "\n");
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




exports.make = function(name) {
  var list = [];


  var source = new Source(name);
  compileDirectory(CODE_ROOT + name, source);
  
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

  fs.writeFile(DEV_ROOT + name + ".js", source.output());
}

