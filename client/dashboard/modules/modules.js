

Template.iModules.moduleTypes = function() {
	return ModuleTypes.find({}); 
};

Template.iModules.title = function() {
  return this.name ? this.name.capitalize() : '';
};



Template.iModules.events({

  'click .iModules-addButton': function(e) {
    var type = $(e.target).closest('.iModules-addButton').data('type');
    // var str = Template['iModules-new']();
    // console.log(str);
    var popup = Impact.Dashboard.popup('iModules-new', this);
    popup.find('.iModules-newField').first().focus();
    console.log('SETTING TYPE', type);
    popup.data('type', type);
    console.log('TYPE SET', popup.data('type'));
  },


});


