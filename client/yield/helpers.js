(function () {

  Handlebars.registerHelper('renderModule', function () {

    var state  = Impact.Yield;
    var moduleName = Impact.Yield.getCurrentModule();

    var module = Impact.ModuleManager.getInstance(moduleName);
    // console.log(module);
    if (module) {
      return new Handlebars.SafeString(module.render(state) || '');
    }

    // if renderer is undefined fallback to standard router behavior
    var name = Meteor.Router.page();
    var template = Template[name];
    if (template) {
      return new Handlebars.SafeString(template());
    }

    return '';
  });

})();