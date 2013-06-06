////////////////////
/**/(function(){/**/
////////////////////

// Template.iModules.settings = function() {
  
//   var x = ImpactSettings.findOne({});
//   console.log("GOT SETTINGS:", x);
//   return x;
// };


Template.iModules.modules = function() {
  
  return Modules.find({});
};



////////////////////
/*********/})();/**/
////////////////////
