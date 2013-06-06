
Package.describe({
  summary: 'Path and query dict as reactive data source',
});


Package.on_use(function (api) {
  api.add_files("main.js", "client");
});

