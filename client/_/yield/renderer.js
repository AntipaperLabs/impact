(function () {

  var Yield = function () {
    this.listeners = {};
    this.currentModule  = null;
    this.path = [];
    this.params = {};
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
      this.params = params;
      this._invalidate();
    },

    setPathAndParams: function (path, params) {
      //TODO: check for changes
      this.path = path;
      this.params = params;
      this._invalidate();
    },

  });

  //TODO: also make params and queryDict reactive


  Impact.Yield = new Yield();

})();



Impact.Yield.enteredPath = function(fullPath) {
  var path = fullPath.split('/');
  var name = path[0];
  path.splice(0, 1);

  var params = $.deparam(this.querystring || '');
    

  // Impact.Yield.setPathAndParams(path, params);

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
      Meteor.Renderer.set(Impact.Modules[name]);
    } else {
      //TODO: verify file existence
      console.log('loading module', name);
      Meteor.Renderer.set(null);
      require(['/-/m/' + name + '/main.js'], function () {
        console.log('loading done');
        constructor = Impact.moduleConstructors[name];
        if (constructor) {
          Impact.Modules[name] = new constructor;
          Meteor.Renderer.set(Impact.Modules[name]);
          console.log(Impact.Modules)
        }
      });
    }
  }
};


