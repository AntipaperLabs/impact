////////////////////
/**/(function(){/**/
////////////////////


Template.iRoles.roles = function() {
  return Roles.find({});
};

Template.iRoles.permissions = function() {
  return Object.values(Impact.GlobalPermissions);
};

Template.iRoles_permissionRow.roles = function() {
  return Roles.find({});
};



////////////////////
/*********/})();/**/
////////////////////
