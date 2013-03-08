////////////////////
/**/(function(){/**/
////////////////////

console.log("+++++++++++++++++++++++++ CREATE FACTORY");

Impact.ModuleFactories = {};

Impact.ModuleFactory = function(moduleClass, options){
  options = options || {};
  this.moduleClass = moduleClass;
  this.loader = options.loader;

  this.prefix = 'im-' + moduleClass + '-';

  Impact.ModuleFactories[moduleClass] = this;
};



$functions(Impact.ModuleFactory, {
  loadModule: function(moduleName) {
    var self = this;
    console.log("LOAD...");

    var _Collection = function(name) {
      return new Meteor.Collection(self.prefix + name);
    };

    this.loader({
      Collection: _Collection,
    });
  },
});



////////////////////
/*********/})();/**/
////////////////////