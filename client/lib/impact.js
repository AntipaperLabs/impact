var Impact = {};


// Most of these won't be used!

// Actual instances, created by Impact
Impact.Modules = {};
// Impact.Cards = {};
// Impact.Widgets = {};
// Impact.Themes = {};

//! MOVED INSIDE MODULE MANAGER

// Created by add-on developer
// Impact.moduleConstructors = {};
// Impact.widgetConstructors = {};
// Impact.themeConstructors = {};
// Impact.cardConstructors = {};

//! CHANGED TO DATABASE QUERY

// Created by site admin
// Impact.moduleClasses = {};
// Impact.themeInfo = {};
// Impact.widgetInfo = {};
// Impact.cardInfo = {};

Meteor.startup(function(){
  console.log("================================================================================");
  console.log("REGISTERED MODULES: ", Modules.find({}).count());
  // Modules.find({}).observe({
  //   added: function(newDoc) {
  //     console.log("ADDED MODULE INFO", newDoc);
  //     Impact.moduleClasses[newDoc.name] = newDoc.moduleClass;
  //     console.log("REGISTERED MODULES: ", Modules.find({}).count());
  //   }, 
  //   changed: function(newDoc, oldDoc) {
  //     delete Impact.moduleClasses[oldDoc.name];
  //     Impact.moduleClasses[newDoc.name] = newDoc.moduleClass;
  //     console.log("REGISTERED MODULES: ", Modules.find({}).count());
  //   },
  //   removed: function(oldDoc) {
  //     delete Impact.moduleClasses[oldDoc.name];
  //     console.log("REGISTERED MODULES: ", Modules.find({}).count());
  //   },

  // });
});