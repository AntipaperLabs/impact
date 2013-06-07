

Template.iModules.moduleTypes = function() {
	return ModuleTypes.find({}); 
};

Template.iModules.title = function() {
  return this.name ? this.name.capitalize() : '';
};


// Template.iModules.events({
// 	'click button.moduleButton': function(event) {

// 	var x = ".popup[name="+event.target.name+"]";
// 		$(x).fadeIn();	

// 	},
// });

// Template.dialog.events({
// 	'click .cancel': function(){
// 		var x = ".popup[name="+this.type+"]";
// 		$(x).fadeOut();	
// 	},

// 	'click .save': function(){
// 		var input ='input[name='+this.type+']';
// 		var name = $(input)[0].value;

// 		var test = Modules.findOne({name:name});
// 	    if(!test){
// 		    Modules.insert({
// 		    name: name,
// 		    type: this.type,
// 		    fake: true,
// 		  	});		 
// 	    }

// 		var x = ".popup[name="+this.type+"]";
// 		$(x).fadeOut();	
// 	}
// });

