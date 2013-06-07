
Template.iLayout.yield = function() {

  console.log("LAYOUT ", this);
  if(! this.view) return "No such view";
  if(! Template[this.view]) return "No such template";
  console.log("WILL DRAW TEMPLATE", this.view);
  return new Handlebars.SafeString(Template[this.view](this.data));
};






Template.iLayout.bulbs = function() {

  if(!this.prefix) return [];
  console.log("BULBS", this);

  var tab = Impact.Dashboard.bulbs[
    Impact.Dashboard.bulbPrefixes[this.prefix]
  ];

  if(tab.last().load === '/-module') {

    var modules = Modules.find({}).fetch();

    modules.each(function(module) {
      tab.push({
        title: module.name.capitalize(),
        id: 'm:' + module.name,
        icon: 'ò',
        url: '/-module/' + module.name,
      });
    });

  } else if(tab.last().load === '/-storage') {

  }

  console.log("GOT BULBS", tab);

  for(var i = 0; i < tab.length; ++i) {
    if(tab[i].id === this.bulb) {
      tab[i].active = true;
    }
  }

  return tab;

};


