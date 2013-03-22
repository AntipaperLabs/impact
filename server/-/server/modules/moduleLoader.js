////////////////////
/**/(function(){/**/
////////////////////


Meteor.startup(function(){
  Object.each(ImpactSettings.findOne({}).modules, function(k,v){
    console.log(""+k+" => "+v.moduleClass);
    if(Impact.ModuleFactories[v.moduleClass])
      Impact.ModuleFactories[v.moduleClass].loadModule(k);
  });

  // Impact.ModuleFactory = {};

  // Impact.

});


////////////////////
/*********/})();/**/
////////////////////
