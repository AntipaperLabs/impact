require('sugar');
var fs = require('fs');
var proc = require('child_process');
var fsx = require('./fsx');


// if(fs.existsSync('public/-/'));
fsx.remove('public/-/');
fs.mkdirSync('public/-/',0700);
fs.mkdirSync('public/-/m/',0700);

fsx.remove('.plugins/');
fs.mkdirSync('.plugins/', 0700);
fs.mkdirSync('.plugins/m/', 0700);

var module = require('./module/make');
fs.readdirSync('.meteor/impact/modules').forEach(module.make);



