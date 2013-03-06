(function () {

  Impact.ModuleFactory = function (moduleClass, options) {
    options = options || {};
    //TODO: more error handling
    var message = 'invalid module factory for module `' + moduleClass + '`';
    this.moduleClass = moduleClass;
    this.exports = new Impact.Exports (options);
    // verify loader function existance
    if (options.loader instanceof Function) {
      this.loader = options.loader;
    } else {
      this.exports.addError(message, 'the module does not define loader function');
    }
    // verify templates object
    if (options.templates instanceof Object) {
      this.templates = options.templates;
    } else {
      this.exports.addError(message, 'the module does not define templates object');
    }
    // register this factory
    if (moduleClass)
      Impact.ModuleManager.addFactory(moduleClass, this);
  };

  //---------------- helper function --------------
  // Mock database method by adding key to selector
  var _proxyMethod = function(collection, method, key, value) {
    return function() {
      var args = arguments;
      if(args[0] !== undefined) {
        args[0][key] = value;
      } else {
        args[0] = {key: value};
      };
      return method.apply(collection, args);
    }
  };

  var _proxyCollection = function (collection, proxyName, reproxy) {
    var methods = ['find', 'findOne', 'insert', 'remove', 'update'];
    var self = this;
    // create and return the proxy object
    var proxy = {}, noOp = function(){};
    if (reproxy) {
      methods.each(function (methodName) {
        proxy[methodName] = _proxyMethod(collection, collection[methodName] || noOp, 'collectionName', proxyName);
      });
    } else {
      methods.each(function (methodName) {
        proxy[methodName] = _proxyMethod(collection, collection[methodName] || noOp, 'moduleName', proxyName);
      });
      proxy.subcollection = function(collectionName) {
        return _proxyCollection(this, collectionName, true);
      };
    }
    return proxy;
  };

  $functions(Impact.ModuleFactory, {

    // DEFAULT ROUTINES
    templates: {},

    loader: function () {},

    // CREATE MODULE INSTANCE
    create: function (name, options) {

      options = options || {};
      //-------------------------------------
      options.moduleClass = this.moduleClass;
      options.factory     = this;
      //------------------------------------------------------
      var instance = new Impact.ModuleInstance(name, options);
      //------------------------------------------------------
      var prefix = Impact.ModuleManager.getUniquePrefix(name);
      var _Template = {};

      // install templates in global context
      Object.each(this.templates, function (templateName, templateCode) {
        Impact._def_template(templateName, templateCode, prefix);
        // proxy for the "real" meteor template
        _Template[templateName] = Template[prefix + templateName];
      });

      // proxy Meteor session
      var _S = function(key, value) {
        if(typeof value !== 'undefined') {
          Session.set(prefix+key, value);
        }
        return Session.get(prefix+key);
      };

      // prepare exports object
      var exports = new Impact.Exports ();
      // feed with factory errors
      exports.copyErrors(this.exports);

      // prepare module context
      var context = {
        exports: exports,
        Name: name,
        S: _S,
        Template: _Template,
        Documents: _proxyCollection(Documents, name),
        Versions: _proxyCollection(Versions, name),
        Notes: _proxyCollection(Notes, name),
      };

      // try executing factory loader function
      try {
        this.loader(context);
      } catch (err) {
        exports.addError(
          'an error occured while executing loader function', err.toString()
        );
      }

      //TODO: make it more safe (do not allow overwriting of some fields)
      Object.merge(instance, exports);
      return instance;
    },

  });

})();