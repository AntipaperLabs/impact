// ////////////////////
// /**/(function(){/**/
// ////////////////////


// // Handlebars.registerHelper('renderModule',
// Template.yield.helpers({
//   renderModule: function() {

//     var state  = Impact.Yield;
//     var moduleName = Impact.Yield.getCurrentModule();

//     var module = Impact.ModuleManager.getInstance(moduleName);

//     // TODO-T
//     // Without moduleName check dashboard will not render.
//     // Still, it seems very fiddly. This function needs to update reactively
//     // in order for paths put earlier in the router to work.
//     // Is there another way?
//     if (moduleName && module) {
//         return new Handlebars.SafeString(module.render(state) || '');
//     }

//     console.log(moduleName);

//     // EXTRACTED to upper level
//     // probably remove
//     //
//     // if renderer is undefined fallback to standard router behavior
//     // var name = Meteor.Router.page();
//     // var template = Template[name];
//     // if (template) {
//     //   return new Handlebars.SafeString(template());
//     // }

//     return 'ERROR: UNKNOWN MODULE';
//   },
// });


// ////////////////////
// /*********/})();/**/
// ////////////////////
