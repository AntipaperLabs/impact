
var chokidar = require('chokidar');
require('sugar');

// var http = require('http');
// var url = require('url');
// var path = require('path');
// var fs = require('fs');
var make = require('./make');
var exec = require('child_process').exec;



var printInfo = function() {
  exec("ipconfig getifaddr en1", function (error, stdout, stderr) {
    var line = (''+stdout).split('\n')[0];
    console.log('----------------------------');
    console.log('SERVING AT ' + line + ':3000');
    console.log('----------------------------');
  });
};




/* //////////////////////////////////////////////////////////// */
/* File watching */
/* //////////////////////////////////////////////////////////// */

var compilePossible = true;
var compileRequested = false;

var compile = (function() {
  console.log('Started compilation @ ' + (new Date()).toLocaleTimeString());

  make.make(function(){
    console.log('Finished compilation @ ' + (new Date()).toLocaleTimeString());
    console.log('');
    printInfo();
    compilePossible = true;

    if(compileRequested) requestCompilation();
  });
  // setTimeout(function(){
    
  // }, 1000);

});

var requestCompilation = function() {
  if(compilePossible) {
    compilePossible = false;
    setTimeout(function(){
      compileRequested = false;
      compile();
    }, 100);
  } else {
    compileRequested = true;
  }
};


var watcher = chokidar.watch(['./.impact'], {persistent: true});

watcher
  .on('all', function(event, path){
    console.log('* [' + path + '] changed @ ' + (new Date()).toLocaleTimeString());
    requestCompilation();
    // console.log('Refreshed.');
  });


requestCompilation();



/* //////////////////////////////////////////////////////////// */
/* Go on with mrt */
/* //////////////////////////////////////////////////////////// */


var mrt = exec('mrt', function (error, stdout, stderr) {
  if(error) {
    console.log("*****************");
    console.log(" ERROR while mrt ");
    console.log("*****************");
    process.exit(1);
  }
});



mrt.stdout.pipe(process.stdout);
mrt.stderr.pipe(process.stderr);


