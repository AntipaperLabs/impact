
Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {'gravatar': 1, 'role': 1}});
});

Meteor.publish("modules", function () {
  return Modules.find({});
});



