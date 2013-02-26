(function () {

  Handlebars.registerHelper('renderModule', function () {

    var renderer  = Impact.Yield.get();
    var path      = Impact.Yield.getPath();
    var params    = Impact.Yield.getParams();

    if (renderer)
      return new Handlebars.SafeString(renderer.render(params, queryDict) || '');

    // if renderer is undefined fallback to standard router behavior
    var name = Meteor.Router.page();
    var template = Template[name];
    if (template)
      return new Handlebars.SafeString(template());
  });

})();