/*
  Compile module code
*/

require('sugar');
require('../lib/oop.js');

var fs = require('fs');
var pathTools = require('path');
var fsx = require('../lib/fsx');
var handlebarsTools = require('./template');
var C = require('./config');
var sourceTools = require('./source');
var sourceType = sourceTools.type;


/*
  Add code from file depending on its extension
*/
var compileFileWithExtension = {
  '.js': function(header, code, tailer, filename, source, type) {
    source.addCode(header + code + tailer, type);
  },

  '.html': function(header, code, tailer, filename, source, type) {
    if(type === sourceType.client) {
      code = handlebarsTools.compile(code, filename);
      source.addCode(code + "\n", sourceType.clientTemplate);
    }
  },
};

/*
  Compile source code from file
*/
var compileFile = function(path, source, type) {
  var fileExtension = pathTools.extname(path).toLowerCase();
  if(Object.keys(compileFileWithExtension).indexOf(fileExtension) === -1) return;

  var filename = path.substring(C.sourceCodeRoot.length);
  var code = fs.readFileSync(path, 'utf8');
  var header = "\n" + C.fileBreakComment +
               "// "+ filename +
               C.fileBreakComment + "\n\n";
  var tailer = "\n\n" + C.fileBreakComment + "\n";

  console.log("COMPILE FILE", filename);
  compileFileWithExtension[fileExtension](header, code, tailer, filename, source, type);
}

/*
  Compile source code from directory
*/
var compileDirectory = function(path, source, type) {
  if(!fs.existsSync(path)) return;
  console.log("COMPILE DIRECTORY", path);

  fs.readdirSync(path).forEach(function(fileLastName) {
    if(fileLastName.startsWith('.')) return;
    var filename = path + '/' + fileLastName;

    if(fs.statSync(filename).isDirectory()) {
      compileDirectory(filename, source, type);
    } else {
      compileFile(filename, source, type);
    }
  });
}



/*
  Compile the whole module
*/
exports.make = function(name) {
  C.initialize();

  if(name.startsWith('.')) return;

  console.log("==========================");
  console.log("  MAKE MODULE ["+name+"]");
  console.log("==========================");



  var source = new sourceTools.Source(name);

  compileDirectory(C.sourceCodeRoot + name + '/shared', source, sourceType.client);
  compileDirectory(C.sourceCodeRoot + name + '/shared', source, sourceType.server);
  compileDirectory(C.sourceCodeRoot + name + '/client', source, sourceType.client);
  compileDirectory(C.sourceCodeRoot + name + '/server', source, sourceType.server);

  if(fs.existsSync(C.sourceCodeRoot + name + '/manifest.json')) {
    source.manifest = fs.readFileSync(C.sourceCodeRoot + name + '/manifest.json', 'utf8');
  }

  fs.writeFile(C.clientOutputRoot + name + ".js", source.clientOutput());
  fs.writeFile(C.serverOutputRoot + name + ".js", source.serverOutput());

  // var list = [];


  // var source = new Source(name);
  // compileDirectory(CODE_ROOT + name + "/shared", source);
  // compileDirectory(CODE_ROOT + name + "/client", source);
  // var dashSource = new Source(name);
  // compileDirectory(CODE_ROOT + name + "/dashboard", dashSource);

  // source.templates += dashSource.templates;
  // source.dashboard = dashSource.constructor;

  // var serverSource = new Source(name);
  // compileDirectory(CODE_ROOT + name + "/shared", serverSource);
  // compileDirectory(CODE_ROOT + name + "/server", serverSource);


  // // makeDirectory(name, CODE_ROOT + name, );

  // // var dev = "";
  // // list.forEach(function(file){
  // //   dev += "require(" +
  // //          "['" + file + "']," +
  // //          "function(){\n";
  // // });
  // // dev += "console.log('MODULE LOADED: ["+name+"]');\n";
  // // dev += "Impact.loadedModuleConstructor('"+name+"');\n";
  // // list.forEach(function(file){
  // //   dev += "});";
  // // });
  // // dev += "\n";

  // fs.writeFile(DEV_ROOT + name + ".js", source.output());
  // fs.writeFile(SERVER_ROOT + name + ".js", serverSource.serverOutput());
}

