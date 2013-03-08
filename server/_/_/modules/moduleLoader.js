////////////////////
/**/(function(){/**/
////////////////////


Meteor.startup(function(){
  Object.each(ImpactSettings.findOne({}).modules, function(k,v){
    console.log(""+k+" => "+v);
    if(Impact.ModuleFactories[v])
      Impact.ModuleFactories[v].loadModule(k);
  });

  // Impact.ModuleFactory = {};

  // Impact.

});


////////////////////
/*********/})();/**/
////////////////////
