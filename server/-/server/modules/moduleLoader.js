////////////////////
/**/(function(){/**/
////////////////////


Meteor.startup(function(){
  Object.each(Modules.find({}).fetch(), function(k,v){
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
