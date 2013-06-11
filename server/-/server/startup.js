

Meteor.startup(function(){

  if(ImpactSettings.find({}).count() < 1) {
    ImpactSettings.insert({
      _id: '0',
      home: '/-site',
    });
  }


});


