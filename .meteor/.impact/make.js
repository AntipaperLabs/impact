// Impact extension compiler
// Main file

require('sugar');
var fs = require('fs');
var module = require('./module/make');


// For each directory under ./impact/modules
// run module compiler routine
fs.readdirSync('.impact/modules').forEach(module.make);



