

Impact.modules = {};
Impact.factories = {};

var status = new ReactiveDict;


var handle = Meteor.subscribe("modules", function () {

  
  //TODO: consider using observe here
  Modules.find({}).forEach(function (module) {

    define("loaders/" + module.name, [], function () {
      status.set(module.name, 'loading');
      ModuleLoader.ready("factories/" + module.type, function (factory) {
        // status.set(module.name, 'ok'); // change this as soon as we have working callback
        Impact.modules[module.name] = factory.create(module.name, function () {
          status.set(module.name, 'ok');
        });
      });
      return {
        config: function () { return module },
        status: function () { return status.get(module.name) },
      };
    });

    if (Impact.factories[module.type] === undefined) {
      // make sure we wont define it twice
      Impact.factories[module.type] = null;
      ModuleLoader.define("factories/" + module.type, {
        source: "/-/m/" + module.type + ".js",
        verify: function () { return Impact.factories[module.type] },
        loaded: function () {}, //Q: do we need initialization here?
      });
    }

  });

});


Impact.requireModule = function (name) {
  if (!handle.ready())
    return { status: 'loading' };
  var loader = require('loaders/' + name);
  if (loader) {
    var module = {
      status: loader.status(),
      config: loader.config(),
    };
    if (status.equals(name, 'ok'))
      module.module = Impact.modules[name];
    return module;
  }
  return { status: 'error' };
};



