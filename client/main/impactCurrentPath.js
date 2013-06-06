
Handlebars.registerHelper('impactCurrentPath', function() {

  var state = Path.get();

  return state.path.join(',  ');
  
});

