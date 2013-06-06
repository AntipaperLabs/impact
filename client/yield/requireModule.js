
require('model', function (model) {

  Impact.modules = {};
  Impact.factories = {};

  var status = new ReactiveDict;
  var handle = Meteor.subscribe("modules", function () {

    //TODO: consider using observe here
    model.modules.find({}).forEach(function (module) {

      define("loaders/" + module.name, [], function () {
        status.set(module.name, 'loading');
        ModuleLoader.ready("factories/" + module.type, function (factory) {
          // status.set(module.name, 'ok'); // change this as soon as we have working callback
          Impact.modules[module.name] = factory.create(module.name, function () {
            status.set(module.name, 'ok');
          });
        });
        return { status: function () { return status.get(module.name) } };
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
      if (status.equals(name, 'ok')) {
        return {
          status: loader.status(),
          module: Impact.modules[name],
        };
      }
      return { status: loader.status() };
    }
    return { status: 'error' };
  };

});
