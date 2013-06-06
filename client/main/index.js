

var renderHomePage = function() {
  return 'HOME PAGE';
};


var render404 = function() {
  return 'That looks like a 404 error to me.'
};


var renderDashboard = function(state) {
  state.matchRoute = Impact.Routing.matchRoute.bind(state);

  var route = state.matchRoute(dashboardRoutes);

  if(! route) return 'Bleargh! I am now officially dead.';
  if(! Template[route.view]) return 'This page does not exist.';

  return new Handlebars.SafeString(Template[route.view](route.data));
};


var renderModule = function(state) {
  var state1 = {
    path: state.path.clone(),
    query: state.query,
  };
  state1.path.splice(1,1);
  state1.matchRoute = Impact.Routing.matchRoute.bind(state1);

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

  if(!(route && route.view))
    return new Handlebars.SafeString(Template.error404());

  return module.module.render(route.view, route.data);  
};



Handlebars.registerHelper('impactIndex', function() {

  var state = Path.get();

  if((state.path.length <= 1) ||
     (state.path[1].length < 1)) {
    return renderHomePage();
  }

  if(state.path[1] === '-') {
    /* These paths should be resolved by 'public' route */
    return render404();
  }

  if(state.path[1].startsWith('-')) {
    return renderDashboard(state);
  } else {
    return renderModule(state);
  }

});

