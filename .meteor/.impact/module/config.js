var fs = require('fs');
var fsx = require('../lib/fsx');


exports.sourceCodeRoot      = '.impact/modules/';
exports.clientOutputRoot    = 'public/-/m/';
exports.serverOutputRoot    = 'server/-plugins/m/';
exports.urlRoot             = '/-/m/';

exports.fileBreakComment    = "\n////////////////////////////////////////\n";



var initialized = false;

exports.initialize = function() {
  if(initialized) return;
  initialized = true;

  fsx.ensureClean(exports.clientOutputRoot);
  fsx.ensureClean(exports.serverOutputRoot);
};