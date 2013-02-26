

Meteor.Router.add({
  '/:name/*' : function (tail, name) {
    var params    = tail.split('/');
    var queryDict = $.deparam(this.querystring);

    Meteor.Renderer.setParams(params);
    Meteor.Renderer.setQueryDict(queryDict);

    console.log(Impact.Modules)
    if (Impact.Modules[name]) {
      Meteor.Rederer.set(Impact.Modules[name]);
    } else {
      var constructor = Impact.moduleConstructors[name];
      if (constructor) {
        //TODO: use class instead of name
        //TODO: try using dev version if present
        Impact.Modules[name] = new constructor;
        Meteor.Renderer.set(Impact.Modules[name]);
      } else {
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
    return 'loadingModule';
  },
});

/*
ładowanie modułu:
1) Impact.Modules[name] - istnieje? to ok.
2) Impact.dev.moduleConstructors[class] - istnieje? to ok.
3) Impact.moduleConstructors[class] - istnieje? to ok.
4) Załaduj plik z public/, użyj Impact.moduleConstructors[class]
*/