
var fake = function () {};

var Fake = fake.prototype;

Fake.render = function (state) {
  var path   = state.getPath();
  var params = state.getParams();
  console.log('renderd with state', path, params.fetch());
};

Impact.has.module('fake', fake);