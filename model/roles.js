////////////////////
/**/(function(){/**/
////////////////////

Meteor.role = function() {
  var user = Meteor.user();
  if(user) return Roles.find({_id: user.role});
  return Roles.find({name: 'guest'});
};


////////////////////
/*********/})();/**/
////////////////////
