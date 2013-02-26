(function () {

  var Renderer = function () {
    this.listeners = {};
    this.renderer  = null;
    this.params = [];
    this.queryDict = {};
  };


  $functions(Renderer, {

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

    get: function () {
      this._reactive();
      return this.renderer;
    },

    getParams: function () {
      this._reactive();
      return this.params;
    },

    getQueryDict: function () {
      this._reactive();
      return this.queryDict;
    },

    set: function (renderer) {
      if (this.renderer === renderer)
        return; // do not invalidate
      this.renderer = renderer;
      this._invalidate();
    },

    setParams: function (params) {
      //TODO: check for changes
      this.params = params;
      this._invalidate();
    },

    setQueryDict: function (queryDict) {
      //TODO: check for changes
      this.queryDict = queryDict;
      this._invalidate();
    },

  });

  //TODO: also make params and queryDict reactive

  Meteor.Renderer = new Renderer ();

})();