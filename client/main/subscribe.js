

Deps.autorun(function(){
  Meteor.subscribe('users');
});

Deps.autorun(function(){
  Meteor.subscribe('impactSettings');
});

Deps.autorun(function(){
  Meteor.subscribe("moduleTypes");
});
