////////////////////
/**/(function(){/**/
////////////////////

console.log("+++++++++++++++++++++++++ CREATE FACTORY");

Impact.ModuleFactories = {};

Impact.ModuleFactory = function(moduleClass, options){
  options = options || {};
  this.moduleClass = moduleClass;
  this.loader = options.loader;

  Impact.ModuleFactories[moduleClass] = this;
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
    };

    this.loader({
      Name: moduleName,
      Collection: _Collection,
      Methods: _Methods,
      Permissions: _Permissions,
    });
  },
});



////////////////////
/*********/})();/**/
////////////////////