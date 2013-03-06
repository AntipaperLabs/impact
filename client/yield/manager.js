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

    _registerModuleFactory: function (moduleClass, factory) {
      factory.moduleClass = moduleClass;
      this.factories[moduleClass] = factory;
    },

    _installTemplate: function (name, template, prefix) {
      prefix = prefix || '';
      //-------- recursion ------------
      var traverse = function (array) {
        if (array[0] === ">") {
          array[1] = prefix + array[1];
        } else {
          array.each(function (node) {
            if (node instanceof Array)
              traverse(node);
          });
        }
      };
      // console.log("TEMPLATE PREIX = ", prefix);
      // add prefix to all partial calls
      traverse(template);
      // install this template in Meteor
      Meteor._def_template(prefix + name, Handlebars.json_ast_to_func(template));
    },


    // --------- helper function --------
    // Mock database method by add key to filter
    _proxyMethod: function(collection, method, key, value) {
      return function() {
        var args = arguments;
        if(args[0] !== undefined) {
          args[0][key] = value;
        } else {
          args[0] = {key: value};
        };
        return method.apply(collection, args);
      }
    },

    _proxyCollection: function (collection, proxyName, reproxy) {
      var methods = ['find', 'findOne', 'insert', 'remove', 'update'];
      var self = this;
      // create and return the proxy object
      var proxy = {}, noOp = function(){};
      if(reproxy) {
        methods.each(function (methodName) {
          proxy[methodName] = self._proxyMethod(collection, collection[methodName] || noOp, 'collectionName', proxyName);
        });
      } else {
        methods.each(function (methodName) {
          proxy[methodName] = self._proxyMethod(collection, collection[methodName] || noOp, 'moduleName', proxyName);
        });
        proxy.subcollection = function(collectionName) {
          return self._proxyCollection(this, collectionName, true);
        };
      }
      return proxy;
    },

    _createInstance: function (factory, name) {
      var self = this;
      var instance = {name: name, moduleClass: factory.moduleClass};
      var prefix = 'im-' + name + '-';
      var _Template = {};
      // instal templates first using Meteor routines
      //TODO: also allow custom templates defininition (without Handlebars)
      Object.each(factory.templates, function (templateName, templateCode) {
        self._installTemplate(templateName, templateCode, prefix);
        // proxy the real meteor template
        _Template[templateName] = Template[prefix + templateName];
      });

      var _S = function(key, value) {
        if(typeof value !== 'undefined') {
          Session.set(prefix+key, value);
        }
        return Session.get(prefix+key);
      };

      var _Notes  = self._proxyCollection(Notes, name); //XXX: temporary!!! we do not have Comments collection defined yet
      var _Documents = self._proxyCollection(Documents, name);
      var _Versions  = self._proxyCollection(Versions, name);
      // var arg = {
      //   Name: name,
      //   S: _S,
      //   Template: _Template,
      //   Documents: _Documents,
      //   Versions: _Versions,
      //   Comments: _Comments,
      // };
      // console.log("FACTORY = ",factory);
      // console.log("ARG = ", arg);
      //factory.loader(arg, instance, name);
      factory.loader(instance, name, _S, _Template, _Documents, _Versions, _Notes);
      // factory.loader(instance, name);
      // factory.loader(arg);
      // console.log("ARG EXPORTS = ", arg.exports);
      // return arg.exports;
      return instance;
    },

    getModuleFactory: function (moduleClass) {
      //TODO: return instance that renders the loading screen
      var emptyFactory = {
          templates: {},
          moduleClass: '#loader',
          loader: function (exports){
            exports.render=function(){return 'loading...'};
          },
      };
      if (!moduleClass || moduleClass==='#loader') return emptyFactory;
      //---------------------------------------------------------------
      this._catchListener(this._factoryListeners, moduleClass);
      if (this.factories[moduleClass] === undefined) {
        var self = this;
        //XXX: note that the URL is hardcoded here
        require(['/-/m/' + moduleClass + '.js'], function () {
          self._pokeListeners(self._factoryListeners, moduleClass);
        });
      }
      return this.factories[moduleClass] || emptyFactory;
    },

    getInstanceConfig: function (name) {
      this._catchListener(this._configListeners, name);
      return this.config[name] || {};
    },

    getInstance: function (name) {
      this._catchListener(this._instanceListeners, name);
      var instance = this.instances[name];
      if (!instance || instance.moduleClass === '#loader') {
        var config  = this.getInstanceConfig(name);
        var factory = this.getModuleFactory(config.moduleClass);
        if (factory) {
          this.instances[name] = instance = this._createInstance(factory, name);
        }
      }
      //TODO: return instance representing loading screen :)
      return instance || {render: function(){}};
    },

  });

  Impact.ModuleManager = new ModuleManager ();

  Meteor.startup(function () {
    Impact.ModuleManager._observe();
  });

})();

