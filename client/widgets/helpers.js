
// TODO: I would rather make this helper local for our layout templates
//Template.someLayout.area = function (name) {

Handlebars.registerHelper('area', function (config) {
  return new Handlebars.SafeString(Template.area({
    areaName:name,
    viewName:"",
  }));
});

Handlebars.registerHelper('showWidget', function (config) {
  var handle = Impact.requireWidget(config);
  if (handle.status === 'loading') {
    // render spinning wheel
  } else if (handle.status === 'ok')
    return new Handlebars.SafeString(handle.widget.render());
  return ''; // render some error message
});
