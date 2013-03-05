////////////////////
/**/(function(){/**/
////////////////////

// Handlebars.registerHelper('renderModule',
Template.dashboard.helpers({
  renderDashboard: function() {

    var state = Impact.Dashboard.path;

    var places = ['users', 'roles', 'modules', 'themes'];
    if(places.indexOf(state[0]) == -1) return "Unknown place";

    return new Handlebars.SafeString(Template['i'+state[0].capitalize()]());

  },
});





////////////////////
/*********/})();/**/
////////////////////
