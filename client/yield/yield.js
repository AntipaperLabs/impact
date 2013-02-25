Template.yield.modules = function() {
  var modules = Modules.find({});
  modules.forEach(function(module){
    if(Impact.Modules[module.name]) return;
    Impact.Modules[module.name] = {
      name: module.name,
      module: module.module,
      loaded: false
    }
  });
  return modules;
}


Template.yield.rendered = function() {
  // console.log("YIELD RENDER");
  // console.log(window.location.pathname);

  var tab = (''+window.location.pathname).split('/');
  var name = tab[1];
  var params = tab;
  params.splice(0,2);


  // Impact.initialized = false;
  // Impact.initialize();
  // console.log("IMPACT INITIALIZED");
  // console.log(Impact.Modules);
  // console.log(Modules.find({}));


  setTimeout(function(){
    if(Impact.Modules[name]) {
      if(!Impact.Modules[name].loaded) {
        var module = Impact.Modules[name].module;
        var fileref = document.createElement('script')
        fileref.setAttribute('type','text/javascript')
        fileref.setAttribute('src', '/-/m/' + module + '/main.js');
        document.getElementsByTagName('head')[0].appendChild(fileref);

        setTimeout(function(){
          console.log(module);
          Impact.ModuleTemplates[module].initialize(name);
          setTimeout(function(){
            templateYieldFill(name, params);
          }, 1000);
        }, 1000);
        
      } else {
        templateYieldFill(name, params);
      }
      
    } else {
      $('.yield').html('UNKNOWN MODULE');
    }

  },1);
};


var templateYieldFill = function(name, params) {
  $('.yield').html('rendering module ' + name);
  var m = Impact.Modules[name].it;
  if(m)
    console.log(m.render(params));
  else
    console.log("NO M");
};









