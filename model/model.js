
/*

  moduleName:

  metadata:
  header:
  chunks: [{
    type:
    content:
  }]

  versions: ['id']

  tags:
  notes: [{
    
  }]

*/

var Documents = new Meteor.Collection('documents');


/*
  documentId:
  createdAt:
  createdBy:
  memo:

  // NOT MVP - THINK ABOUT IT LATER
  // recentEdits: {
  //   'userId': 'date'
  // }



  metadata:
  header:
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
var Notes = new Meteor.Collection('notes');



/*
  owner | user | guest

*/
var Roles = new Meteor.Collection('roles');


var Modules = new Meteor.Collection('modules');
