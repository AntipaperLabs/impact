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

    this.loader({
      Collection: _Collection,
    });
  },
});



////////////////////
/*********/})();/**/
////////////////////