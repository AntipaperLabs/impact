////////////////////
/**/(function(){/**/
////////////////////


  $functions(Impact._ModuleManagerConstructor, {

    //TODO: print warnings in case of possible overwriting
    //TODO: more inteligent comparision

    getInstancePrefix: function (name) {
      // It starts with 1 now! Dislike.
      var value = (this._counters[name] || 0) + 1;
      this._counters[name] = value;

      // Changed format due to following scenario:
      // Module: news-0, collection: 0-data
      // Module: news, collection: 0-0-data
      // ...wait, it still does not work!
      // Think of something better.
      return (value)
              ? 'im' + value.toString() + '-' + name + '-'
              : 'im-' + name + '-';
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



////////////////////
/*********/})();/**/
////////////////////

