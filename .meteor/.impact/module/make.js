require('sugar');

var fs = require('fs');
var proc = require('child_process');

// fs.readdirSync('.meteor/impact/modules').forEach(module.make);



var makeFile = function(path) {
  if(!path.endsWith('.js')) return;
  
  console.log("FILE: "+path);
}

var makeDirectory = function(directory) {
  var array = fs.readdirSync(directory);
  array.forEach(function(name){
    var filename = directory + '/' + name;
    if(fs.statSync(filename).isDirectory()) {
      makeDirectory(filename);
    } else {
      makeFile(filename);
    }
  });
}



exports.make = function(name) {
  // console.log("MAKE: " + name);
  // console.log(fs.readdirSync('.'));
  // console.log(fs.readdirSync('.meteor/impact/modules/'+name));
  makeDirectory('.meteor/impact/modules/'+name);
  // makeDirectory('./meteor/impact/modules/'+name);
}