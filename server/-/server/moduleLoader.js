
Meteor.startup(function(){
  Object.each(Modules.find({}).fetch(), function(index,module){
    console.log(""+index+" => "+module.type);
    if(Impact.ModuleFactories[module.type])
      Impact.ModuleFactories[module.type].loadModule(module.name);
  });

});
