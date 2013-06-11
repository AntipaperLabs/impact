


// var validate = function(field) {

// }

Template['iModules-new'].title = function() {
  return this.name ? this.name.capitalize() : '';
};


Template['iModules-new'].events({

  'click .iModules-newCancelButton': function(e) {
    Impact.Dashboard.popupDismiss($(e.target).closest('.dashboard-popup-overlay'));
  },

  'click .iModules-newActionButton': function(e) {

    var popup = $(e.target).closest('.dashboard-popup-overlay');
    var field = popup.find('.iModules-newField').first();

    var name = field.val();
    if(!name.match(/^[a-z][a-z0-9_\-]*/)) {
      field.addClass('dashboard-field-with-error');
      Impact.Dashboard.popupGrowl(popup, [
        'Name may contain only small letters, numbers, - and _ characters.',
        'It must start with a letter.'
      ]);
      return;
    }

    console.log("TYPE", popup.data('type'));

    Meteor.call('addModule', popup.data('type'), name, function(error, result) {
    
      // console.log("CALLBACK!");
      if(error) {
        // console.log("ERROR");
        Impact.Dashboard.popupGrowl(popup, ['An error occured.', '' + error]);
        return;
      }
      if(result.success) {
        // console.log("SUCCESS", result);
        Impact.Dashboard.popupDismiss(popup);
        return;
      } else {
        // console.log("FAILURE", result);
        Impact.Dashboard.popupGrowl(popup, ['Module not added.', result.message]);
        return;
      }

    });

    
  },  

});
