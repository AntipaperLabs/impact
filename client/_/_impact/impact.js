var Impact = {};


// Most of these won't be used!

// Actual instances, created by Impact
Impact.Modules = {};
Impact.Cards = {};
Impact.Widgets = {};
Impact.Themes = {};

// Created by add-on developer
Impact.moduleConstructors = {};
Impact.widgetConstructors = {};
Impact.themeConstructors = {};
Impact.cardConstructors = {};

// Created by site admin
Impact.moduleInfo = {};
Impact.themeInfo = {};
Impact.widgetInfo = {};
Impact.cardInfo = {};


Impact.has = {
  module: function(classname, constructor) {
    Impact.moduleConstructors[classname] = constructor;
  };
};