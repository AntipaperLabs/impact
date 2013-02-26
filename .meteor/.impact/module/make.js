require('sugar');

var fs = require('fs');
var fsx = require('../fsx');
var proc = require('child_process');


var CODE_ROOT = '.meteor/impact/modules/';
var CODE_ROOT_LENGTH = CODE_ROOT.length;

var DEV_ROOT = 'public/-/m/';
var URL_ROOT = '/-/m/';

var makeFile = function(path, list) {
  //XXX: for testing only
  //if (path.endsWith('.html')) {
  //  var template = require('./template');
  //  console.log(template.compile(fs.readFileSync(path, 'utf8')));
  //}

  if(!path.endsWith('.js')) return;
  
  var filename = path.substring(CODE_ROOT_LENGTH);
  list.push(URL_ROOT + filename);
  fsx.copy(path, DEV_ROOT + filename);
}

var makeDirectory = function(directory, list) {
  var dirName = directory.substring(CODE_ROOT_LENGTH);
  fs.mkdirSync(DEV_ROOT + dirName);

  
  fs.readdirSync(directory).forEach(function(name) {
    var filename = directory + '/' + name;
    if(fs.statSync(filename).isDirectory()) {
      makeDirectory(filename, list);
    } else {
      makeFile(filename, list);
    }
  });
}



exports.make = function(name) {
  var list = [];
  makeDirectory(CODE_ROOT + name, list);
  console.log(list);

  var dev = "";
  list.forEach(function(file){
    dev += "require(" +
           "['" + file + "']," +
           "function(){\n    console.log('loaded -[" + file + "]-');\n}" +
           ");\n";
  });

  fs.writeFile(DEV_ROOT + name + "/main.js", dev);
}

