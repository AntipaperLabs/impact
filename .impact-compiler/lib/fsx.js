/*
  File system utilities
*/

require('sugar');
var fs = require('fs');
var path = require('path');

/* 
  Remove all files in a directory
*/
var removeIn = function(dir) {
  fs.readdirSync(dir).forEach(function(file){
    remove(dir + '/' + file);
  });
};


/*
  Force remove file
  Works also for non-empty directories
*/
var remove = function(file) {
  if(!fs.existsSync(file)) return;
  // console.log("REMOVING ["+file+"]");
  if(fs.statSync(file).isDirectory()) {
    removeIn(file);
    fs.rmdirSync(file);
  } else {
    fs.unlinkSync(file);
  }
};

exports.remove = remove;

/*
  Copies file contents
*/
var copy = function(from, to) {
  fs.createReadStream(from).pipe(fs.createWriteStream(to));
};

exports.copy = copy;


/*
  Ensures a directory exists
*/
var ensure = function(file) {
  if(fs.existsSync(file)) {
    if(fs.statSync(file).isDirectory()) {
      return;
    } else {
      fs.unlinkSync(file);
    }
  }
  ensure(path.dirname(file));
  fs.mkdirSync(file, 0700);
};

exports.ensure = ensure;

/*
  Ensures a directory exists and is empty
*/
var ensureClean = function(file) {
  ensure(file);
  removeIn(file);
};

exports.ensureClean = ensureClean;





