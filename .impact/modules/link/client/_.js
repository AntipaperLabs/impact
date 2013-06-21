
exports.render = function (config) {
  
  var source = new ReactiveDict();
  var handle = DataHandle(config.data.name, config.data.options);

  handle.ready(function (data) {
    source.set('name', data.name);
    source.set('href', data.href);
  });

  return Template.showLink({
    name: config.name,
    data: source,
  });
};
