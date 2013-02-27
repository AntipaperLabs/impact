(function () {

  Handlebars.registerHelper('renderModule', function () {

    var state  = Impact.Yield;
    var module = Impact.Yield.getCurrentModule();
    console.log(module);
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