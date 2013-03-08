////////////////////
/**/(function(){/**/
////////////////////

  Impact.ModuleInstance = function (moduleName, options) {
    options = options || {};
    options.moduleName = moduleName || options.moduleName;

    this._impact = options;

    // if we want to skip registration process and set moduleName
    // properly we can pass module name using options hash
    if (moduleName)
      Impact.ModuleManager.registerInstance (moduleName, this);
  };

  $functions(Impact.ModuleInstance, {

    render: function () {
      if (this._impact.isLoader || this.errors) {
        var template = Template['loader'];
        if (!template)
          return 'ERROR: Template `loader` does not exist!';
        return template(this);
      }
      return 'ERROR: the module `' + this._impact.moduleName + '` has not defined render function';
    },

  });



////////////////////
/*********/})();/**/
////////////////////