require('sugar');

var fs = require('fs');


var removeIn = function(dir) {
  fs.readdirSync(dir).forEach(function(file){
    remove(dir + '/' + file);
  });
};

var remove = function(file) {
  if(!fs.existsSync(file)) return;
  // console.log("REMOVING ["+file+"]");
  if(fs.statSync(file).isDirectory()) {
    removeIn(file);
    fs.rmdirSync(file);
  } else {
    fs.unlinkSync(file);
  }
}

exports.remove = remove;



var copy = function(from, to) {
  // console.log("===== COPY");
  // console.log("        "+from);
  // console.log("      TO");
  // console.log("        "+to);

  fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

exports.copy = copy;
