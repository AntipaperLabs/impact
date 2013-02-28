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
      this._invalidateKey(key);
    },

    unset: function (key) {
      if (!Object.has(this._properties, key))
        return;
      delete this._properties[key];
      this._invalidateKey(key);
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

      Object.each(this._properties, function (key) {
        if (!Object.has(object, key))
          self.unset(key);
      });
    },

    _invalidateKey: function (key) {
      for (var contextId in this._listeners[key])
        this._listeners[key][contextId].invalidate();
    },

  });

  var Yield = function () {
    this.listeners = {};
    this.moduleName  = null;
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
      return this.moduleName;
    },

    getPath: function () {
      this._reactive();
      return this.path;
    },

    getParams: function () {
      //this._reactive();
      return this.params;
    },

    setCurrentModuleAndState: function (moduleName, path, params) {
      // if (this.currentModule === currentModule) {
        // return; // do not invalidate
      this.moduleName = moduleName;
      this.path = path;
      // console.log(params)
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

    enteredPath: function(fullPath) {
      console.log(fullPath)
      var path = fullPath.split('/');
      var name = path[0];
      path.splice(0, 1);
      var params = $.deparam(this.querystring || '');
      this.setCurrentModuleAndState(name, path, params);
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

  // Impact.Yield.enteredPath = function(fullPath) {
  //   var path = fullPath.split('/');
  //   var name = path[0];
  //   path.splice(0, 1);

  //   var params = $.deparam(this.querystring || '');

  //   // console.log("IMPACT MODULES:");
  //   // console.log(Impact.Modules);

  //   this.setCurrentModuleAndState(name, path, params);

  //   // Requested module is already cached
  //   if (Impact.Modules[name]) {
  //     Impact.Yield.setCurrentModuleAndState(Impact.Modules[name], path, params);
  //   } else {
  //     //TODO: verify file existence
  //     console.log(' ******* ******* ******* ******* ');
  //     console.log(' ******* loading module', name);
  //     Impact.Yield.setCurrentModuleAndState(null);
  //     Meteor.autorun(function () {
  //         var info = Modules.findOne({name:name});
  //         if (info) {
  //           var module_name = info.module;
  //           // load module source files
  //           Impact.loadModuleConstructor(module_name, function() {
  //             console.log('******* loading done');
  //             constructor = Impact.moduleConstructors[module_name];
  //             if (constructor) {
  //               Impact.Modules[name] = new constructor;
  //               Impact.Yield.setCurrentModuleAndState(Impact.Modules[name], path, params);
  //               // console.log(Impact.Modules)
  //             }
  //           });
  //         }
  //     });
  //   }
  // };

})();

// Impact.loadModuleConstructorCallbacks = {};


// Impact.makeImportantLogCall = function(asdf) {
//   console.log("[[[[[   -"+asdf+"-  ]]]]]");
// };

// Impact.loadedModuleConstructor = function(name) {
//   Impact.loadModuleConstructorCallbacks[name]();
//   delete Impact.loadModuleConstructor[name];
// };

// Impact.loadModuleConstructor = function(className, callback) {

//   Impact.loadModuleConstructorCallbacks[className] = callback;

//   require(['/-/m/' + className + '.js'], function(){
//     console.log("******LOADED!");
//   });
//   // $.ajax('/-/m/' + className + '.js', {
//   //   dataType: '',
//   //   success: function(data) {
//   //     console.log(" ******* success!");
//   //     // console.log(data);
//   //     // console.log(" ******* success!");

//   //     // with(Impact) {eval(data);};
//   //     // console.log(data.substring(2, data.length-2));

//   //     // eval(data.substring(2, data.length-2));
//   //   }
//   // });

//   // require(['/-/m/' + className + '/main.js']);
// };

