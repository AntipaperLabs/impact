

Impact.mrouter = function(array, map) {
  var self = this;

  for(var key in map) {
    // console.log("MROUTER test key:", key);
    if(!Impact.mrouter.match(array, key)) continue;
    var value = map[key];
    // console.log("MROUTER match found!", value);
    if(typeof value == "string") return value;
    if(typeof value == "function") return value.apply(this, array);
    continue;
  }

  return undefined;
};


Impact.mrouter.match = function(array, string) {
  if(string.startsWith('/')) string = string.substring(1);
  var tab = string.split('/');  
  if(tab[0] == "") {
    tab.removeAt(0);
  }

  if(array.length != tab.length) return false;
  for(var i = 0; i < tab.length; ++i) {
    if(tab[i] == '?') continue;
    if(tab[i].startsWith(':')) continue;
    if(array[i] != tab[i]) return false;
  }
  return true;


  // return false;
};

