Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {'gravatar': 1, 'role': 1}});
});