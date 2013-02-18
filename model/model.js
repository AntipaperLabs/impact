/*

currentVersionId:
versions: [{
  id:
  createdAt:
  createdBy:
  notes:
}]
comments: [{
  
}]

*/

var Documents = new Meteor.Collection('documents');


/*
  metadata:
  chunks: [{
    type:
    content:
  }]
*/
var Versions = new Meteor.Collection('versions');

/*
  createdAt:
  userId:
  name:
  content:
*/
var Comments = new Meteor.Collection('comments');



/*
  owner | user | guest

*/
var Roles = new Meteor.Collection('roles');


var Modules = new Meteor.Collection('modules');
