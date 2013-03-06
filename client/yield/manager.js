(function () {

  var ModuleManager = function () {
    // manager cache
    this.instances = {};
    this.factories = {};
    // describe relation between classes and instances
    this.config = {};
    // for reactivity implemantation
    this._counters          = {};
    this._configListeners   = {};
    this._factoryListeners  = {};
    this._instanceListeners = {};
  };

  $functions(ModuleManager, {

    _observe: function () {
      //TODO: also observe other things
      //      like changes / deletion etc.
      var self = this;
      Modules.find({}).observe({
        added: function (info) {
          self.config[info.name] = {
            moduleClass : info.moduleClass,
          };
          //----------------------------------------------------
          self._pokeListeners(self._configListeners[info.name]);
        },
      });
    },

    _pokeListeners: function (listeners, key) {
      if (key) listeners = listeners[key];
      //----------------------------------
      for (var contextId in listeners) {
        // console.log('Listeners ', listeners[contextId])
        listeners[contextId].invalidate();
      }
    },

    _catchListener: function (listeners, key) {
      // works both with and without key value
      var context = Meteor.deps.Context.current;
      if (context) {
        var listenersForKey = listeners;
        //------------------------------
        if (key) {
          if (!listeners[key])
            listeners[key] = {};
          listenersForKey = listeners[key];
        }
        if (!listenersForKey[context.id]) {
          listenersForKey[context.id] = context;
          var self = this;
          context.onInvalidate(function () {
            delete listenersForKey[context.id];
            //XXX: is this necessary???
            if (key && Object.isEmpty(listenersForKey))
              delete listeners[key];
          });
        }
      }
    },

    _registerModuleFactory: function (moduleClass, options) {
      (new Impact.ModuleFactory(moduleClass, options));
    },

    getUniquePrefix: function (name) {
      var value = (this._counters[name] || 0) + 1;
      this._counters[name] = value;
      return 'im-' + name + '-' + value.toString() + '-';
    },

    registerFactory: function (moduleClass, factory) {
      //TODO: print warnings in case of possible overwriting
      //TODO: more inteligent comparision
      if (this.factories[moduleClass] === factory)
        return; // nothing changed
      this.factories[moduleClass] = factory;
      this._pokeListeners(this._factoryListeners, moduleClass);
    },

    registerInstance: function (moduleName, instance) {
      //TODO: print warnings in case of possible overwriting
      //TODO: more inteligent comparision
      if (this.instances[moduleName] === instance)
        return; // nothing changed
      this.instances[moduleName] = instance;
      this._pokeListeners(this._instanceListeners, moduleName);
    },

    resetModuleFactory: function (moduleClass) {
      console.log('reseting module', moduleClass);
      delete this.factories[moduleClass];
      this._pokeListeners(this._factoryListeners, moduleClass);
    },

    getModuleFactory: function (moduleClass) {
      //TODO: return instance that renders the loading screen
      if (!moduleClass) return;
      //-------------------------------------------------------
      this._catchListener(this._factoryListeners, moduleClass);
      //TODO: put some locker to prevent multiple ajax calls
      if (this.factories[moduleClass] === undefined) {
        // load module soruce code
        var self = this;
        //XXX: note that the URL is hardcoded here
        Meteor.setTimeout(function () {
          $.ajax({
            url: '/-/m/' + moduleClass + '.js',
            type: 'GET',
            dataType: 'script',
          }).done(function (msg) {
            self._pokeListeners(self._factoryListeners, moduleClass);
          }).fail(function (jqXHR, textStatus) {
            //TODO: provide more information about the error
            //XXX: not that constructor is reactive
            //     (i.e. it registers the module factory in the manager)
            self.factories[moduleClass] = new Impact.ModuleFactory (moduleClass, {
              errors: {
                message : 'an error occured while loading module ' + moduleClass,
                reason  : textStatus,
              }
            });
          });
        }, 1000);
      }
      return this.factories[moduleClass];
    },

    getInstanceConfig: function (name) {
      this._catchListener(this._configListeners, name);
      return this.config[name] || {};
    },

    getLoader: function (name, options) {
      options = options || {};
      options.moduleName = name;
      options.isLoader = true;
      // we use undefined to prevent module registration
      return new Impact.ModuleInstance(undefined, options);
    },

    getInstance: function (name) {
      this._catchListener(this._instanceListeners, name);
      var config = this.getInstanceConfig(name);
      var factory = this.getModuleFactory(config.moduleClass);
      if (factory) {
        var instance = this.instances[name];
        if (instance && instance._impact.factory === factory)
          return instance;
        // defer the instance creation process
        var self = this;
        Meteor.setTimeout(function () {
          // instance created by a factory will by automatically
          // registerd in the manager
          factory.createInstance(name);
        }); // timeout = 0
      }
      // we can only use getLoder, because loader module does not
      // register in module manager; otherwise we would end up
      // with an infinite loop of context invalidation
      return this.getLoader(name);
    },

  });

  Impact.ModuleManager = new ModuleManager ();

  Meteor.startup(function () {
    Impact.ModuleManager._observe();
  });

})();

