/* Compile all Impact files */


var fs = require('fs');
var module = require('./module/make');


exports.make = function(callback) {
  /* For each directory under ./impact/modules
     run module compiler routine */
  fs.readdirSync('.impact/modules').forEach(module.make);
  callback.call();
};



