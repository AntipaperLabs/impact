
/*
  impact {
    createdAt:
    updatedAt:
    createdBy:

  }

*/

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

// var Documents = new Meteor.Collection('documents');


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
// var Versions = new Meteor.Collection('versions');

/*
  moduleName:

  createdAt:
  userId:
  name:
  content:
*/
// var Notes = new Meteor.Collection('notes');



/*
  owner | user | guest

*/

define('model', [], function () {
  return {
    roles   : new Meteor.Collection('roles'),
    modules : new Meteor.Collection('modules'),
  };
});

Roles = require('model').roles;
Modules = require('model').modules;
