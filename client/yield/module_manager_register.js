(function () {

  $functions(Impact._ModuleManagerConstructor, {

    //TODO: print warnings in case of possible overwriting
    //TODO: more inteligent comparision

    getInstancePrefix: function (name) {
      var value = (this._counters[name] || 0) + 1;
      this._counters[name] = value;
      return 'im-' + name + '-' + value.toString() + '-';
    },

    registerFactory: function (moduleClass, factory) {
      if (this.factories[moduleClass] === factory)
        return; // nothing changed
      this.factories[moduleClass] = factory;
      this._pokeListeners(this._factoryListeners, moduleClass);
    },

    registerInstance: function (moduleName, instance) {
      if (this.instances[moduleName] === instance)
        return; // nothing changed
      //-----------------------------------------------------------
      instance._impact.prefix = this.getInstancePrefix(moduleName);
      //-----------------------------------------------------------
      this.instances[moduleName] = instance;
      this._pokeListeners(this._instanceListeners, moduleName);
    },

    deleteModuleFactory: function (moduleClass) {
      delete this.factories[moduleClass];
      this._pokeListeners(this._factoryListeners, moduleClass);
    },

  });

})();

