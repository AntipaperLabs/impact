Impact.Yield = {};



Impact.Yield.entered = function(fullPath) {
  var path = fullPath.split('/');
  var name = path[0];
  path.splice(0, 1);

  var params = $.deparam(this.querystring || '');
    


  Meteor.Renderer.setParams(params);
    Meteor.Renderer.setQueryDict(queryDict);


    // console.log("ROUTER");
    // console.log("**tail:");
    // console.log(tail);
    // console.log("**name:");
    // console.log(name);
    // console.log("**params:");
    // console.log(params);

    console.log(Impact.Modules);
    if (Impact.Modules[name]) {
      Meteor.Renderer.set(Impact.Modules[name]);
    } else {
      var constructor = Impact.moduleConstructors[name];
      if (constructor) {
        //TODO: use class instead of name
        //TODO: try using dev version if present
        Impact.Modules[name] = new constructor;
        Meteor.Renderer.set(Impact.Modules[name]);
      } else {
        //TODO: verify file existence
        console.log('loading module', name);
        Meteor.Renderer.set(null);
        require(['/-/m/' + name + '/main.js'], function () {
          console.log('loading done');
          constructor = Impact.moduleConstructors[name];
          if (constructor) {
            Impact.Modules[name] = new constructor;
            Meteor.Renderer.set(Impact.Modules[name]);
            console.log(Impact.Modules)
          }
        });
      }
    }
};