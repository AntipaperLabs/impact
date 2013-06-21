
Impact.ModuleFactory = function (type, options) {
  options = options || {};

  this.type = type;
  this.exports = {};

  //TODO: verify if the data is correct
  this.loader = options.loader;
  this.templates = options.templates;
};

Impact.collections = {};

$functions(Impact.ModuleFactory, {

  // CREATE MODULE INSTANCE
  create: function (name, callback) {
    //TODO: later change it to something different
    var prefix = 'im1' + '-' + name + '-';
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

    var _Method = function() {
      
      var name = prefix + arguments[0];
      console.log("CALLING METHOD",name);
      console.log(arguments[0]);
      var args = Array.prototype.splice.call(arguments, 0);
      args.splice(0, 1);
      var last = args[args.length - 1];
      var callback = undefined;
      if(typeof last === 'function') {
        callback = last;
        args.splice(args.length - 1, 1);
      }
      // console.log(typeof last);
      console.log("WITH ARGUMENTS", args);
      console.log("AND CALLBACK", callback);
      Meteor.apply(name, args, callback);
      // Meteor.apply(arguments[0], arguments)
      // arguments[0] = prefix + arguments[0];
      // console.log(arguments[0]);
      // Meteor.call.call(arguments);
    };

    var _Subscribe = function () {
      if (arguments.length > 0)
        arguments[0] = prefix + arguments[0];
      Meteor.subscribe.apply(Meteor, arguments);
    };

    var _DataSource = function () {

    };

    var _DataHandle = function () {
      return {
        ready: function () {},
        stop: function () {},
      }
    };

    // prepare exports object
    var exports = {};

    //Q: use try/catch block here ?
    this.loader({
      exports: exports,
      Name: name,
      S: _S,
      Template: _Template,
      Collection: _CreateCollection,
      Method: _Method,
      // Documents: _proxyCollection(Documents, name),
      // Versions: _proxyCollection(Versions, name),
      // Notes: _proxyCollection(Notes, name),

      // add even more objects for safety
      Meteor: {},
      Session: {},
      Impact: {},
      Subscribe: _Subscribe,
      DataSource: _DataSource,
      DataHandle: _DataHandle,
      //...
    });

    callback && callback();

    return exports;
  },

});




