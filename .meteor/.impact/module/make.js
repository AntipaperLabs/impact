require('sugar');

var fs = require('fs');
var fsx = require('../fsx');
var proc = require('child_process');


var CODE_ROOT = '.meteor/impact/modules/';
var CODE_ROOT_LENGTH = CODE_ROOT.length;

var DEV_ROOT = 'public/-/m/';


var makeFile = function(path) {
  if(!path.endsWith('.js')) return;
  
  var filename = path.substring(CODE_ROOT_LENGTH);
  fsx.copy(path, DEV_ROOT + filename);
}

var makeDirectory = function(directory) {
  var dirName = directory.substring(CODE_ROOT_LENGTH);
  fs.mkdirSync(DEV_ROOT + dirName);

  
  fs.readdirSync(directory).forEach(function(name) {
    var filename = directory + '/' + name;
    if(fs.statSync(filename).isDirectory()) {
      makeDirectory(filename);
    } else {
      makeFile(filename);
    }
  });
}



exports.make = function(name) {
  makeDirectory(CODE_ROOT + name);
}

