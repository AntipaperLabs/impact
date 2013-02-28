

Impact.mrouter = function(array, map) {
  var self = this;

  for(var key in map) {
    if(!Impact.mrouter.match(array, map[key])) continue;
    var value = map[key];
    if(typeof value == "string") return value;
    if(typeof value == "function") return value.apply(this, array);
    continue;
  }

  return undefined;
};


Impact.mrouter.match = function(array, string) {
  var tab = string.split('/');
  tab.splice(0,1);
  console.log(array);
  console.log(tab);

  if(array.length != tab.length) return false;
  for(var i = 0; i < tab.length; ++i) {
    if(tab[i] == '?') continue;
    if(tab[i].startsWith(':')) continue;
    if(array[i] != tab[i]) return false;
  }
  return true;
};
