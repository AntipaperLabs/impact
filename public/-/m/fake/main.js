(function () {

  var Fake = function (name) {
    this.render = function (params, queryData) {
      console.log('rendering with params', params, queryData);
    }
  };

  Impact.moduleConstructors['fake'] = Fake;
  
})();