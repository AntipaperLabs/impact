////////////////////
/**/(function(){/**/
////////////////////



Template.yield.helpers({
  renderModule: function() {

    if(Impact.Yield.requestedModuleName == Impact.Yield.state.name) {
      return Impact.Yield.currentModule.render(Impact.Yield.state);
    } else {
      Impact.Yield.reloadModule();
    };

    return Modules.find({}).fetch().reduce(function(sum, item) {
      return sum + ' ['+item.name+': '+item.moduleClass+'] ';
    }, '');
    // if(Impact.Yield.currentModuleName == Impact.Yield.requestedModuleName) {
    //   return Impact.Yield.currentModule.render(Impact.Yield.state);
    // } else {
    //   return new Handlebars.SafeString(Template.loading());
    // }
    
    return 'ERROR: UNKNOWN MODULE';
  },
});


////////////////////
/*********/})();/**/
////////////////////
