
Impact.Routing = {};

Impact.Routing.dashboardRoutes = {

  '/-modules': {view: 'iModules'},

  '/-module/:name': function(path, query) {
    return {
      view: 'iModule',
      data: { moduleName: path[2] },
    };
  },

  '/-users': {view: 'iUsers'},

};

Impact.Routing.matchRoute = function(map) {
  var self = this;
  console.log('MATCHING ROUTE', this.path);
  // console.log('WITH', map);

  for(var key in map) {
    console.log('check key', key);

    if(!_routeMatches(this.path, key)) continue;
    console.log('FOUND!');

    var value = map[key];

    if(typeof value === 'function') return value.apply(this, this.path);
    return value;
    continue;
  }
  console.log('nothing found!');

  return undefined;
};


var _routeMatches = function(array, string) {
  var tab = string.split('/');  
  
  console.log('    - match', array, tab);

  if(array.length != tab.length) return false;
  for(var i = 0; i < tab.length; ++i) {
    if(tab[i] == '?') continue;
    if(tab[i].startsWith(':')) continue;
    if(array[i] != tab[i]) return false;
  }
  return true;
};