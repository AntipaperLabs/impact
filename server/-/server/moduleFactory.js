
Impact.ModuleFactories = {};


Impact.registerModuleFactory = function(moduleType, params) {
  params = params || {};
  params.manifest = params.manifest || {};

  var factory = new Impact.ModuleFactory(moduleType, params);
  Impact.ModuleFactories[moduleType] = factory;

  Meteor.startup(function(){

    if(!ModuleTypes.findOne({name: moduleType})) {
      console.log("TYPES INSERT", moduleType);

      ModuleTypes.insert({
        name: moduleType,
        icon: 'K',
        views: params.manifest.views,
        roles: params.manifest.roles,
      });
    } else {
      console.log("TYPES UPDATE", moduleType);
      ModuleTypes.update({
        name: moduleType,
      }, { $set: {
        icon: 'K',
        views: params.manifest.views,
        roles: params.manifest.roles,
      }});
    }
  });
};

Impact.ModuleFactory = function(moduleClass, options){
  options = options || {};
  this.moduleClass = moduleClass;
  this.loader = options.loader;

  // Impact.ModuleFactories[moduleClass] = this;
};



$functions(Impact.ModuleFactory, {
  loadModule: function(moduleName) {
    var self = this;
    console.log("LOAD...");
    var prefix = 'im1-' + moduleName + '-';

    var _Collection = function(name) {
      console.log("CREATE COLLECTION: "+name);
      return new Meteor.Collection(prefix + name);
    };

    var _Methods = function(dict) {
      for(var functionName in dict) {
        var ob = {};
        ob[prefix + functionName] = dict[functionName];
        console.log("CREATE FUNCTION: "+prefix+functionName);
        Meteor.methods(ob);
      }
    };

    var _Permissions = function() {
      this.allow = function() {console.log("["+prefix+"]: ALLOW?");}
      this.deny = function() {console.log("["+prefix+ "]: DENY?");}
      return this;
    };

    var _Publish = function () {
      if (arguments.length > 0)
        arguments[0] = prefix + arguments[0];
      Meteor.publish.apply(Meteor, arguments);
    };

    this.loader({
      Name: moduleName,
      Collection: _Collection,
      Methods: _Methods,
      Permissions: _Permissions,
      Publish: _Publish,
    });
  },
});


