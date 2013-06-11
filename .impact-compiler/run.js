/*
  Main file of Impact development server
*/

var chokidar = require('chokidar');   /* File watching package */
require('sugar');                     /* Javascript utility functions */

var make = require('./make');         /* Impact compile procedure */
var exec = require('child_process').exec;   /* Run command line function */


/*
  Print server address
*/
var printInfo = function() {
  exec("ipconfig getifaddr en1", function (error, stdout, stderr) {   /* TODO: this works for OSX, check other systems */
    var line = (''+stdout).split('\n')[0];
    console.log('----------------------------');
    console.log('SERVING AT ' + line + ':3000');
    console.log('----------------------------');
  });
};




/**************************************************************/
/* File watching */
/**************************************************************/


var compilePossible = true;     /* Semaphore - compile is possible unless another compilation is running. */
var compileRequested = false;   /* Semaphore flag - compilation is necessary, but was not possible when requested. */


/*
  Called when compilation is necessary.
*/
var requestCompilation = function() {

  
  if(compilePossible) {
    
    /* Semaphore is up */

    compilePossible = false;      /* Lower the semaphore */
    setTimeout(function(){        /* Perform the compilation. */
      compileRequested = false;   
      compile();
    }, 100);                      /* The actual action is delayed so that changing 100 files won't trigger 100 compilations. */

  } else {

    /* Semaphore is down */

    compileRequested = true;      /* Set the flag - compilation will be performed when semaphore goes up. */
  }
};


/*
  Perform actual compilation
*/
var compile = (function() {
  console.log('Started compilation @ ' + (new Date()).toLocaleTimeString());

  /* Compile function with finished callback */
  make.make(function(){
    console.log('Finished compilation @ ' + (new Date()).toLocaleTimeString());
    console.log('');
    printInfo();

    compilePossible = true;                       /* Raise the semaphore */
    if(compileRequested) requestCompilation();    /* Call another compilation if requested */
  });

});


/* Set up watcher for Impact files */
var watcher = chokidar.watch(['./.impact'], {persistent: true});

watcher
  .on('all', function(event, path){               /* Compile on any event */
    console.log('* [' + path + '] changed @ ' + (new Date()).toLocaleTimeString());
    requestCompilation();
  });


requestCompilation();



/* //////////////////////////////////////////////////////////// */
/* Go on with mrt */
/* //////////////////////////////////////////////////////////// */


/* Run mrt */
var mrt = exec('mrt', function (error, stdout, stderr) {
  if(error) {
    console.log("*****************");
    console.log(" ERROR while mrt ");
    console.log("*****************");
    process.exit(1);
  }
});

/* Display mrt outputs */
mrt.stdout.pipe(process.stdout);
mrt.stderr.pipe(process.stderr);


