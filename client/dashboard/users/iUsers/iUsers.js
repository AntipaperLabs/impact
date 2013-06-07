////////////////////
/**/(function(){/**/
////////////////////



Template.iUsers.roles = function() {
  return Roles.find({});
};

Template.iUsers_role.users = function() {
  console.log("USERS FOR ROLE",this);
  return Meteor.users.find({role: this._id});
};

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



////////////////////
/*********/})();/**/
////////////////////
