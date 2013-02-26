require('sugar');

var fs = require('fs');
var fsx = require('../fsx');
var proc = require('child_process');
var handlebars = require('./template.js');


var CODE_ROOT = '.meteor/impact/modules/';
var CODE_ROOT_LENGTH = CODE_ROOT.length;

var DEV_ROOT = 'public/-/m/';
var URL_ROOT = '/-/m/';

var makeFile = function(name, path, list) {
  if(path.endsWith('.js')) {
    var filename = path.substring(CODE_ROOT_LENGTH);
    list.push(URL_ROOT + filename);
    fsx.copy(path, DEV_ROOT + filename);
  } else if(path.endsWith('.html')) {
    var filename = path.substring(CODE_ROOT_LENGTH);
    var outFilename = filename.substring(0, filename.length-5) + '.js';
    var htmlCode = fs.readFileSync(path, 'utf8');
    var jsCode = handlebars.compile(htmlCode, filename, name);
    console.log(jsCode);

  }

  //XXX: for testing only
  //if (path.endsWith('.html')) {
  //  var template = require('./template');
  //  console.log(template.compile(fs.readFileSync(path, 'utf8')));
  //}

  
}

var makeDirectory = function(name, directory, list) {
  var dirName = directory.substring(CODE_ROOT_LENGTH);
  fs.mkdirSync(DEV_ROOT + dirName);

  
  fs.readdirSync(directory).forEach(function(name) {
    var filename = directory + '/' + name;
    if(fs.statSync(filename).isDirectory()) {
      makeDirectory(name, filename, list);
    } else {
      makeFile(name, filename, list);
    }
  });
}



exports.make = function(name) {
  var list = [];
  makeDirectory(name, CODE_ROOT + name, list);
  // console.log(list);

  var dev = "";
  list.forEach(function(file){
    dev += "require(" +
           "['" + file + "']," +
           "function(){\n";
  });
  dev += "console.log('MODULE LOADED: ["+name+"]');\n";
  dev += "Impact.loadedModuleConstructor('"+name+"');\n";
  list.forEach(function(file){
    dev += "});";
  });
  dev += "\n";

  fs.writeFile(DEV_ROOT + name + "/main.js", dev);
}

