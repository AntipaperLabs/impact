
Handlebars.registerHelper('impactIndex', function() {

  var state = Path.get();

  if(state.path.length <= 1) return "HOME PAGE";
  if(state.path[1].startsWith('-')) {
    return "DASHBOARD" + state.path[1];
  } else {
    return "MODULE " + state.path[1];
  }


  // return state.path.join(',  ');
  
});

