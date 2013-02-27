(function () {

  var ModuleManager = function () {
    // manager cache
    this.instances = {};
    this.factories = {};
    // describe relation between classes and instances
    this.config = {};
    // for reactivity implemantation
    this._listeners = {};
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
          self._pokeListeners(info.name);
        },
      });
    },

    _pokeListeners: function (key) {
      for (var contextId in this._listeners[key])
        this._listeners[key][contextId].invalidate();
    },

    _catchListener: function (key) {
      var context = Meteor.deps.Context.current;
      if (context) {
        if (!this._listeners[key])
          this._listeners[key] = {};
        var listeners = this._listeners[key];
        if (!listeners[context.id]) {
          listeners[context.id] = context;
          var self = this;
          context.onInvalidate(function () {
            delete listeners[context.id];
            //XXX: is this necessary???
            if (Object.isEmpty(listeners))
              delete self._listeners[key];
          });
        }
      }
    },

    getInstance: function (name) {

    },

  });

  Impact.ModuleManager = new ModuleManager ();

  Meteor.startup(function () {
    Impact.ModuleManager._observe();
  });
 
})();