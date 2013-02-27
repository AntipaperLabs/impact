(function () {

  var ModuleManager = function () {
    // manager cache
    this.instances = {};
    this.factories = {};
    // describe relation between classes and instances
    this.config = {};
    // for reactivity implemantation
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
            module : info.module,
          };
          //----------------------------------------------------
          self._pokeListeners(this._configListeners[info.name]);
        },
      });
    },

    _pokeListeners: function (listeners, key) {
      if (key) listeners = listeners[key];
      //----------------------------------
      for (var contextId in listeners)
        listeners[contextId].invalidate();
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

    _registerModuleFactory: function (moduleName, factory) {
      this.factories[moduleName] = factory;
    },

    getModuleFactory: function (moduleName) {
      this._catchListener(this._factoryListeners, moduleName);
      if (this.factories[moduleName] === undefined) {
        var self = this;
        //XXX: note that the URL is hardcoded here
        require('/-/m/' + moduleName, function () {
          self._pokeListeners(this._factoryListeners, moduleName);
        });
      }
      return this.factories[moduleName];
    },

    getInstanceConfig: function (name) {
      this._catchListener(this._configListeners, name);
      return this.config[name] || {};
    },

    getInstance: function (name) {
      this._catchListener(this._instanceListeners, name);
      if (this.instances[name] === undefined) {
        var config  = this.getInstanceConfig(name);
        var factory = this.getModuleFactory(config.module);
        if (factory) {
          //TODO: make module instance
          console.log('creating module with factory');
          console.log(factory);
        }
      }
      //TODO: return instance representing loading screen :)
      return this.instances[name] || {render: function(){}};
    },

  });

  Impact.ModuleManager = new ModuleManager ();

  Meteor.startup(function () {
    Impact.ModuleManager._observe();
  });

})();


