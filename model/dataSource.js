
var DataSourceHandle = function (options, loader) {

};

$functions(DataSourceHandle, {
  ready: function () {

  },
  stop: function () {

  },
});

Impact.requireDataSource = function (name, options) {
  
};

Impact.defineDataSource = function (name, loader) {
  define('dataSources/' + name, [], function () {
    return {
      require: function (options) {
        return new DataSourceHandle(options, loader);
      },
    };
  });
};

