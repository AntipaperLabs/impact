


Template.iHome.home = function() {
  var is = ImpactSettings.findOne({});
  return is ? is.home : '';
};

Template.iHome.events({

	'click .iHome-setButton': function(e){
    var path = $(e.target).closest('.iHome-box').find('.iHome-field').val();

    console.log('SET PATH',path);
    ImpactSettings.update('0', {$set: {
      home: path
    }});
	},

});
