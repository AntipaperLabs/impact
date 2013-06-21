
Meteor.publish("users", function() {
  return Meteor.users.find({}, {fields: {'gravatar': 1, 'role': 1}});
});
Meteor.publish("modules", function() {
  return Modules.find({});
});

Meteor.publish("moduleTypes", function(){
	return ModuleTypes.find({});
});

Meteor.publish("widgets", function() {
  //Q: maybe we don't have to publish all widgets at once?
  //   maybe we could publish only the widgets from the active view?
  return Widgets.find({});
});

Meteor.publish("widgetTypes", function () {
  return WidgetTypes.find({});
});

Meteor.publish("impactSettings", function() {
	return ImpactSettings.find({});
});



