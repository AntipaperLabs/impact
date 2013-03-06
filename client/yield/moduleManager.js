////////////////////
/**/(function(){/**/
////////////////////

var ModuleManager = function() {
  this.factories = {};
};


$functions(ModuleManager, {
  
  registerModuleConstructor: function(moduleClass, moduleConstructor){
    moduleConstructor.moduleClass = moduleClass;
    this.factories[moduleClass] = moduleConstructor;
  },

  loadModule: function(moduleName, moduleClass) {
    var instance = {};
    var templates = {};
    var factory = this.factories[moduleClass];
      // instal templates first using Meteor routines
      // //TODO: also allow custom templates defininition (without Handlebars)
      // Object.each(factory.templates, function (templateName, templateCode) {
      //   self._installTemplate(templateName, templateCode, prefix);
      //   // proxy the real meteor template
      //   _Template[templateName] = Template[prefix + templateName];
      // });

    //(exports, Name, S, Template, Documents, Versions, Notes)
    factory.load(instance, moduleName, {}, {},   {}, {}, {});
    return instance;
  },

});


Impact.ModuleManager = new ModuleManager();

////////////////////
/*********/})();/**/
////////////////////
