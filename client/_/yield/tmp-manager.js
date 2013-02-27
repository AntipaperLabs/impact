var prefix;

var S = function(key, value) {
  if(typeof value !== 'undefined') {
    Session.set(prefix+key, value);
  }
  return Session.get(prefix+key);
}

