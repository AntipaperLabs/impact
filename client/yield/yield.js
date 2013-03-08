////////////////////
/**/(function(){/**/
////////////////////


  var QueryDict = function () {
    this._properties = {};
    this._listeners  = {};
  };

  Impact.QueryDict = QueryDict;

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
    //XXX: this will be initialized on demand
    //this.params = new QueryDict();
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
      for (var contextId in this.listeners) {
        this.listeners[contextId].invalidate();
      }
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
      if (this.params === undefined) // lazy init
        this.params = new Impact.QueryDict();
      return this.params;
    },

    setCurrentModuleAndState: function (moduleName, path, params, fullPath) {
      // if (this.currentModule === currentModule) {
        // return; // do not invalidate
      this.moduleName = moduleName;
      this.path = path;
      this.fullPath = fullPath;
      this.getParams().copy(params);
      this._invalidate();
    },

    setPathAndParams: function (path, params) {
      //TODO: check for changes
      this.path = path;
      this.getParams().copy(params);
      this._invalidate();
    },

    setParam: function (key, value) {
      this.getParams().set(key, value);
    },

    enteredPath: function(context, fullPath) {
      var path = fullPath.split('/');
      var name = path[0];
      path.splice(0, 1);
      var params = $.deparam(context.querystring || '');
      this.setCurrentModuleAndState(name, path, params, fullPath);
    },


    matchRoute: function(map) {
      var self = this;
      // console.log("MATCHING ROUTE ["+this.fullPath+"]");
      // console.log("OR BETTER: ", this.path);

      for(var key in map) {
        if(!this._routeMatches(this.path, key)) continue;

        var value = map[key];
        // console.log("MROUTER match found!", value);

        if(typeof value == "string") return value;
        if(typeof value == "function") return value.apply(this, this.path);
        continue;
      }

      return undefined;
    },

    _routeMatches: function(array, string) {
      if(string.startsWith('/')) string = string.substring(1);
      var tab = string.split('/');  
      if(tab[0] == "") {
        tab.removeAt(0);
      }

      if(array.length != tab.length) return false;
      for(var i = 0; i < tab.length; ++i) {
        if(tab[i] == '?') continue;
        if(tab[i].startsWith(':')) continue;
        if(array[i] != tab[i]) return false;
      }
      return true;
    },

    
  });

  //TODO: also make params and queryDict reactive
  Impact.Yield = new Yield();



////////////////////
/*********/})();/**/
////////////////////

