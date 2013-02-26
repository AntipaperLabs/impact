require('sugar');
var fs = require('fs');
var proc = require('child_process');


var module = require('./module/make');
fs.readdirSync('.meteor/impact/modules').forEach(module.make);



