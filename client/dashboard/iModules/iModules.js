////////////////////
/**/(function(){/**/
////////////////////

// Template.iModules.settings = function() {
  
//   var x = ImpactSettings.findOne({});
//   console.log("GOT SETTINGS:", x);
//   return x;
// };


Template.iModules.modules = function() {
  
  var x = ImpactSettings.findOne({});
  var y = Object.values(x.modules);
  console.log("GOT Modules:", y);
  return y;
};



////////////////////
/*********/})();/**/
////////////////////
