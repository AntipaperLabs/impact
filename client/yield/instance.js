(function () {

  Impact.ModuleInstance = function (moduleName, options) {
    options = options || {};
    this._impact = options;
    this._impact.moduleName = moduleName;
  };

  $functions(Impact.ModuleInstance, {

    isLoading: function () {
      return this._impact.isLoader && !this.errors;
    },

    render: function () {
      if (this._impact.isLoader || this.errors) {
        var template = Template['loader'];
        if (!template)
          return 'CRITICAL ERROR: Template `loader` does not exist!';
        return template(this);
      }
      return 'ERROR: the module `' + this.moduleClass + '` has not defined render function';
    },

  });

})();

