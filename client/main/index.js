
var dashboardRoutes = {

  '/-modules': {view: 'iModules'},

  '/-module/:name': function(path, query) {
    return {
      view: 'iModule',
      data: { moduleName: path[2] },
    };
  },

  '/-users': {view: 'iUsers'},

};



var matchRoute = function(map) {
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


Handlebars.registerHelper('impactIndex', function() {

  var state = Path.get();

  if(state.path.length <= 1) return "HOME PAGE";
  if(state.path[1] === '-') return 'That looks like a 404 error to me.';

  


  if(state.path[1].startsWith('-')) {


    state.matchRoute = matchRoute.bind(state);

    var route = state.matchRoute(dashboardRoutes);

    if(! route) return 'Bleargh! I am now officially dead.';
    if(! Template[route.view]) return 'This page does not exist.';

    return new Handlebars.SafeString(Template[route.view](route.data));

  } else {

    var state1 = {
      path: state.path.clone(),
      query: state.query,
    };
    state1.path.splice(1,1);
    state1.matchRoute = matchRoute.bind(state1);

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
  
    var route = module.module.routes(state1);

    return module.module.render(route.view, route.data);
  }

});

