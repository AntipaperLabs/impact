////////////////////
/**/(function(){/**/
////////////////////


Meteor.startup(function(){
  Object.each(ImpactSettings.findOne({}).modules, function(k,v){
    console.log(""+k+" => "+v);
  });

  // Impact.ModuleFactory = {};

  // Impact.

});


////////////////////
/*********/})();/**/
////////////////////
