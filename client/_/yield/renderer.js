(function () {

  var QueryDict = function () {
    this._properties = {};
    this._listeners  = {};
  };

  $functions(QueryDict, {

    get: function (key) {
      var context = Meteor.deps.Context.current;
      if (context) {
        if (!this._listeners[key])
          this._listeners[key] = {};
        var listeners = this._listeners[key];
        if (!listeners[context.id])
          listeners[context.id] = context;
        var self = this;
        context.onInvalidate(function () {
          delete listeners[context.id];
          //TODO: is it necessary???
          if (Object.isEmpty(listeners))
            delete self._listeners[key];
        });
      }
      return this._properties[key];
    },

    set: function (key, value) {
      if (value === this._properties[key])
        return;
      this._properties[key] = value;
      for (var contextId in this._listeners[key])
        this._listeners[key][contextId].invalidate();
    },

    fetch: function (key, value) {
      var self = this, data = {};
      Object.each(this._properties, function (key) {
        data[key] = self.get(key);
      });
      return data;
    },

    copy: function (object) {
      var self = this;
      Object.each(object, function (key, value) {
        self.set(key, value);
      });
    },

  });

  var Yield = function () {
    this.listeners = {};
    this.currentModule  = null;
    this.path = [];
    this.params = new QueryDict();
  };


  $functions(Yield, {

    _reactive: function () {
      var context = Meteor.deps.Context.current;
      if (context && !this.listeners[context.id]) {
        this.listeners[context.id] = context;
        var self = this;
        context.onInvalidate(function () {
          delete self.listeners[context.id];
        });
      }
    },

    _invalidate: function () {
      for (var contextId in this.listeners)
        this.listeners[contextId].invalidate();
    },

    getCurrentModule: function () {
      this._reactive();
      return this.currentModule;
    },

    getPath: function () {
      this._reactive();
      return this.path;
    },

    getParams: function () {
      this._reactive();
      return this.params;
    },

    setCurrentModuleAndState: function (currentModule, path, params) {
      // if (this.currentModule === currentModule) {
        // return; // do not invalidate
      this.currentModule = currentModule;
      this.path = path;
      this.params.copy(params);
      this._invalidate();
    },

    setPathAndParams: function (path, params) {
      //TODO: check for changes
      this.path = path;
      this.params.copy(params);
      this._invalidate();
    },

    setParam: function (key, value) {
      this.params.set(key, value);
    },

  });

  //TODO: also make params and queryDict reactive

  var loadModule = function (name, callback) {
    require(['/-/m/' + name + '/_.js'], function () {
      if (callback instanceof Function)
        callback.call(this);
    });
  };

  Impact.Yield = new Yield();

  Impact.Yield.enteredPath = function(fullPath) {
    var path = fullPath.split('/');
    var name = path[0];
    path.splice(0, 1);

    var params = $.deparam(this.querystring || '');

    console.log("IMPACT MODULES:");
    console.log(Impact.Modules);

    // Requested module is already cached
    if (Impact.Modules[name]) {
      Impact.Yield.setCurrentModuleAndState(Impact.Modules[name], path, params);
    } else {
      var constructor = Impact.moduleConstructors[name];
      if (constructor) {
        //TODO: use class instead of name
        //TODO: try using dev version if present
        Impact.Modules[name] = new constructor;
        Impact.Yield.setCurrentModuleAndState(Impact.Modules[name], path, params);
      } else {
        //TODO: verify file existence
        Impact.Yield.setCurrentModuleAndState(null);
        loadModule(name, function () {
          constructor = Impact.moduleConstructors[name];
          if (constructor) {
            Impact.Modules[name] = new constructor;
            Impact.Yield.setCurrentModuleAndState(Impact.Modules[name], path, params);
            console.log(Impact.Modules)
          }
        });
      }
    }
  };

})();
