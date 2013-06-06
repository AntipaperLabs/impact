////////////////////
/**/(function(){/**/
////////////////////

var roles = function() {
  return Roles.find({});
};

Template.iRoles.roles = roles;
Template.iRoles_permissionRow.roles = roles;
Template.iRoles_module.roles = roles;

Template.iRoles_module.permissions = function() {
  var array = [];
  for(var p in this.permissions) {
    array.push({name: p, label: p});
  }
  return array;
};


Template.iRoles.permissions = function() {
  return Object.values(Impact.GlobalPermissions);
};

Template.iRoles.modules = function() {
  return Object.values(ImpactSettings.findOne().modules);
};


////////////////////
/*********/})();/**/
////////////////////
