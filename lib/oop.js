var $extends = function(child, parent) {
  child.prototype = new parent;
  child.prototype.constructor = child;
  child.prototype.super = parent.prototype;
}

var $functions = function(f, object) {
  for(var key in object) {
    f.prototype[key] = object[key];   
  }
}

var $statics = function(f, object) {
  for(var key in object) {
    f[key] = object[key];   
  }
}


