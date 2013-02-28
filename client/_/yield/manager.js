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
        console.log(listeners[contextId])
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
      //TODO: prefix all partial calls in this template
      Meteor._def_template(prefix + name, Handlebars.json_ast_to_func(template));
    },

    _proxyCollection: function (collection, moduleName) {
      var methods = ['find', 'findOne', 'insert', 'remove', 'update'];
      // --------- helper function --------
      var proxyMethod = function (method) {
        return function () {
          var args = arguments;
          if(args[0] !== undefined) {
            args[0].moduleName = moduleName;
          } else {
            args[0] = {moduleName: moduleName};
          };
          return method.apply(collection, args);
        };
      };
      // create and return the proxy object
      var proxy = {}, noOp = function(){};
      methods.each(function (methodName) {
        proxy[methodName] = proxyMethod(collection[methodName] || noOp);
      });
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

      var _Comments  = self._proxyCollection({}); //XXX: temporary!!! we do not have Comments collection defined yet
      var _Documents = self._proxyCollection(Documents, name);
      var _Versions  = self._proxyCollection(Versions, name);
      factory.loader(instance, name, _S, _Template, _Documents, _Versions, _Comments);
      return instance;
    },

    getModuleFactory: function (moduleClass) {
      //TODO: return instance that renders the loading screen
      var emptyFactory = {
          templates: {},
          moduleClass: '#loader',
          loader: function (exports){
            exports.render=function(){};
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
      console.log('getInstance', instance)
      if (!instance || instance.moduleClass === '#loader') {
        var config  = this.getInstanceConfig(name);
        console.log('config', config)
        var factory = this.getModuleFactory(config.moduleClass);
        if (factory) {
          this.instances[name] = instance = this._createInstance(factory, name);
        }
      }
      //TODO: return instance representing loading screen :)
      return instance || {name:'#loader', render: function(){}};
    },

  });

  Impact.ModuleManager = new ModuleManager ();

  Meteor.startup(function () {
    Impact.ModuleManager._observe();
  });
 
})();
