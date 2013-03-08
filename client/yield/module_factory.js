////////////////////
/**/(function(){/**/
////////////////////


  Impact.ModuleFactory = function (moduleClass, options) {
    
    options = options || {};

    this.moduleClass = moduleClass;
    this.exports = new Impact.ModuleExports (options);

    // verify loader function existance
    var msg = 'invalid module factory for module `' + moduleClass + '`';
    if (options.loader instanceof Function) {
      this.loader = options.loader;
    } else {
      this.exports.addError(msg, 'the module does not define loader function');
    }

    // verify templates object
    if (options.templates instanceof Object) {
      this.templates = options.templates;
    } else {
      this.exports.addError(msg, 'the module does not define templates object');
    }

    // register this factory
    if (moduleClass)
      Impact.ModuleManager.registerFactory(moduleClass, this);
  };


////////////////////
/*********/})();/**/
////////////////////
