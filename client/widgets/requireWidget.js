
Impact.widgets = {};
Impact.widgetFactories = {};

var status = new ReactiveDict;

var handle = Meteor.subscribe("widgets", function () {

  //TODO: consider using observe here
  Widgets.find({}).forEach(function (widget) {

    define("widgets/" + widget._id, [], function () {
      status.set(widget._id, 'loading');
      ModuleLoader.ready("widgetFactories/" + widget.type, function (factory) {
        // status.set(module.name, 'ok'); // change this as soon as we have working callback
        Impact.widgets[widget._id] = factory.create(widget._id, function () {
          status.set(widget._id, 'ok');
        });
      });
      return {
        config: function () { return widget },
        status: function () { return status.get(widget._id) },
      };
    });

    if (Impact.widgetFactories[widget.type] === undefined) {
      // make sure we wont define it twice
      Impact.widgetFactories[widget.type] = null;
      ModuleLoader.define("widgetFactories/" + widget.type, {
        source: "/-/m/" + widget.type + ".js", // TODO: later change it to different source
        verify: function () { return Impact.widgetFactories[widget.type] },
        loaded: function () {}, //Q: do we need initialization here?
      });
    }
  });
});

Impact.requireWidget = function (id) {
  if (!handle.ready())
    return { status: 'loading' };
  var loader = require('widgets/' + id);
  if (loader) {
    var widget = {
      status: loader.status(),
      config: loader.config(),
    };
    if (status.equals(id, 'ok'))
      widget.widget = Impact.widgets[id];
    return widget;
  }
  return { status: 'error' };
};

