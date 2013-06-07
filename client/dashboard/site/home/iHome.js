
Meteor.subscribe("shortCuts");

Template.iHome.events({

	'click button': function(){
		var newPath = $('input')[0].value;
		var Id = ShortCuts.findOne({from:'/'})._id;
		ShortCuts.update({_id: Id},{from:'/',to:newPath});
	},

});
