

Meteor.methods({

  'addModule': function(type, name) {

    if(!ModuleTypes.findOne({name: type})) {
      return {success: false, message: 'Unknown module type.'};
    }

    if(!name.match(/[a-z][a-z0-9_\-]*/)) {
      return {success: false, message: 'Invalid module name.'};
    }

    if(Modules.findOne({name: name})) {
      return {success: false, message: 'Module name already used.'};
    }

    var id = Modules.insert({
      name: name,
      type: type,
    });

    console.log("INSERTED MODULE", name, id);

    return {success: true, id: id};

  },

});
