
/*

  moduleName:

  meta:
  head:
  body:
  // recommended body schema:
  // [{
  //  type:
  //  content:
  // }]

  versions: ['id']

  tags:
  notes: [{
    
  }]

*/

var Documents = new Meteor.Collection('documents');


/*
  moduleName:
  documentId:

  createdAt:
  createdBy:
  memo:

  // NOT MVP - THINK ABOUT IT LATER
  // recentEdits: {
  //   'userId': 'date'
  // }



  meta:
  head:
  body:
*/
var Versions = new Meteor.Collection('versions');

/*
  moduleName:

  createdAt:
  userId:
  name:
  content:
*/
var Notes = new Meteor.Collection('notes');



/*
  owner | user | guest

*/
var Roles = new Meteor.Collection('roles');

/*
  name:
  moduleClass:

*/
var Modules = new Meteor.Collection('modules');
