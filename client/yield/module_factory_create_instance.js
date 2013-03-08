////////////////////
/**/(function(){/**/
////////////////////

  Impact.collections = {};

  $functions(Impact.ModuleFactory, {

    // CREATE MODULE INSTANCE
    createInstance: function (name, options) {
      options = options || {};
      //-------------------------------------
      options.moduleClass = this.moduleClass;
      options.factory     = this;
      //----------------------------------------------------
      // a module instance created this way is automatically
      // registered int the module manager
      var instance = new Impact.ModuleInstance(name, options);
      //------------------------------------------------------
      var prefix = instance._impact.prefix;
      var _Template = {};

      // install templates in global context
      Object.each(this.templates, function (templateName, templateCode) {
        Impact._def_template(templateName, templateCode, prefix);
        _Template[templateName] = Template[prefix + templateName];
        _Template[templateName].helpers({"M": name});
      });

      // proxy Meteor session
      var _S = function(key, value) {
        if(typeof value !== 'undefined') {
          Session.set(prefix+key, value);
        }
        return Session.get(prefix+key);
      };

      var _CreateCollection = function(name) {
        var c = new Meteor.Collection(prefix + name);
        Impact.collections[prefix + name] = c;
        return c;
      };



      // prepare exports object
      var exports = new Impact.ModuleExports ();
      // feed with factory errors
      exports.copyErrors(this.exports);

      // prepare module context
      var context = {
        exports: exports,
        Name: name,
        S: _S,
        Template: _Template,
        Collection: _CreateCollection,
        // Documents: _proxyCollection(Documents, name),
        // Versions: _proxyCollection(Versions, name),
        // Notes: _proxyCollection(Notes, name),

        // add even more objects for safety
        Meteor: {},
        Session: {},
        Impact: {},
        //...
      };

      // try executing factory loader function
      try {
        this.loader(context);
      } catch (err) {
        exports.addError(
          'an error occured while executing loader function', err.toString()
        );
      }

      // carefully apply module exports to the module instance
      Object.merge(instance, exports, false, function (key, i, e) {
        if (key === '_impact') {
          //XXX: this is quite serious!
          console.log('warning! module ' + this.moduleClass +
                      ' is trying to overwrite _impact');
          return i;
        }
        return e;
      });

      return instance;
    },

  });

  // //---------------- helper function --------------
  // // Mock database method by adding key to selector
  // var _proxyMethod = function(collection, method, key, value) {
  //   return function() {
  //     var args = arguments;
  //     if(args[0] !== undefined) {
  //       args[0][key] = value;
  //     } else {
  //       args[0] = {key: value};
  //     };
  //     return method.apply(collection, args);
  //   }
  // };

  // var _proxyCollection = function (collection, proxyName, reproxy) {
  //   var methods = ['find', 'findOne', 'insert', 'remove', 'update'];
  //   var self = this;
  //   // create and return the proxy object
  //   var proxy = {}, noOp = function(){};
  //   if (reproxy) {
  //     methods.each(function (methodName) {
  //       proxy[methodName] = _proxyMethod(collection, collection[methodName] || noOp, 'collectionName', proxyName);
  //     });
  //   } else {
  //     methods.each(function (methodName) {
  //       proxy[methodName] = _proxyMethod(collection, collection[methodName] || noOp, 'moduleName', proxyName);
  //     });
  //     proxy.subcollection = function(collectionName) {
  //       return _proxyCollection(this, collectionName, true);
  //     };
  //   }
  //   return proxy;
  // };




////////////////////
/*********/})();/**/
////////////////////