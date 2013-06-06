
var  matchRoute = function(map) {
  var self = this;
  // console.log("MATCHING ROUTE ["+this.fullPath+"]");
  // console.log("OR BETTER: ", this.path);

  for(var key in map) {
    if(!this._routeMatches(this.path, key)) continue;

    var value = map[key];
    // console.log("MROUTER match found!", value);

    if(typeof value == "string") return value;
    if(typeof value == "function") return value.apply(this, this.path);
    continue;
  }

  return undefined;
};

var  _routeMatches = function(array, string) {
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
};


Handlebars.registerHelper('impactIndex', function() {

  var state = Path.get();

  if(state.path.length <= 1) return "HOME PAGE";
  if(state.path[1].startsWith('-')) {

    return "DASHBOARD" + state.path[1];

  } else {

    var module = Impact.requireModule(state.path[1]);
    if(module.status == 'error') {
      return 'Module does not exist';
    }
    if(module.status == 'loading') {
      return 'Loading...';
    }
    if(module.status != 'ok') return 'Blargh! Unknown status!';

    if(!(module.module && module.module.routes && module.module.render)) {
      return 'Blargh! Module doesn\'t click!';
    }

    state.matchRoute = matchRoute.bind(state);
    var route = module.module.routes(state);

    return module.module.render(route.view, route.data);
  }

  
});

