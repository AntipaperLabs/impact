Template.iUsers.users = function() {
  return Meteor.users.find({});
};


Template.iUsers_user.roleName = function() {
  var role = Roles.findOne({_id: this.role});
  return role ? role.name : '---';
};
//   helpers({
//   roleName: function(rid) {
//     return Roles.findOne({_id: rid}).name;
//   },
// });