(function () {

  Handlebars.registerHelper('renderModule', function () {

    var module  = Impact.Yield.getCurrentModule();
    //var params    = Impact.Yield.getParams();
   // var queryDict = Impact.Yield.getQueryDict();

    if (module)
      return new Handlebars.SafeString(module.render() || '');

    // if renderer is undefined fallback to standard router behavior
    var name = Meteor.Router.page();
    var template = Template[name];
    if (template)
      return new Handlebars.SafeString(template());
  });

})();