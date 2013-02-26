(function () {

  Handlebars.registerHelper('renderModule', function () {

    var renderer  = Meteor.Renderer.get();
    var params    = Meteor.Renderer.getParams();
    var queryDict = Meteor.Renderer.getQueryDict();

    if (renderer)
      return new Handlebars.SafeString(renderer.render(params, queryDict) || '');

    // if renderer is undefined fallback to standard router behavior
    var name = Meteor.Router.page();
    var template = Template[name];
    if (template)
      return new Handlebars.SafeString(template());
  });

})();