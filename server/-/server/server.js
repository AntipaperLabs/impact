
Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {'gravatar': 1, 'role': 1}});
});

Meteor.publish("modules", function () {
  return Modules.find({});
});

Meteor.publish("moduleTypes",function(){
	return ModuleTypes.find({});
});

Meteor.publish("shortCuts",function(){
	return ShortCuts.find({});
});



