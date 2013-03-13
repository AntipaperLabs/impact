var Impact = {};

(function () {

  //TODO: decide if this is fine (?)
  var helpers = {};

  Impact.registerModuleHelper = function (helperName, object) {
    if (Object.has(helpers, helperName))
      throw new Error('ERROR! Module helper `' + helperName + '` already exist...');
    helpers[helperName] = object;
  };

  Impact.createHelpersFor = function (moduleInstance) {
    //TODO: if helper is a function make proxy that gets moduleInstance as this
    return helpers;
  };

})();
