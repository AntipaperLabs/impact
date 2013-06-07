
Impact.Routing = {};







Impact.Routing.matchRoute = function(map) {
  var self = this;
  // console.log('MATCHING ROUTE', this.path);
  // console.log('WITH', map);

  for(var key in map) {
    // console.log('check key', key);
    var params = _routeMatches(this.path, key);

    if(!params) continue;
    // console.log('FOUND!');

    var value = map[key];

    if(typeof value === 'function') return value.call(this, params);
    return value;
    continue;
  }
  console.log('nothing found!');

  return undefined;
};


var _routeMatches = function(array, string) {

  var tab = Path.stringToArray(string);
  
  // console.log('    - match', array, tab);

  if(array.length != tab.length) return false;

  var params = {}

  for(var i = 0; i < tab.length; ++i) {
    // if(tab[i] === '*') break;
    if(tab[i] === '?') continue;
    if(tab[i].startsWith(':')) {
      var key = tab[i];
      key = key.substring(1);
      params[key] = array[i];
      continue;
    }
    if(array[i] != tab[i]) return false;
  }
  return params;
};






















