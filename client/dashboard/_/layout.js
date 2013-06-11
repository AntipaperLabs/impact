
Template.iLayout.yield = function() {

  if(! this.view) return "No such view";
  if(! Template[this.view]) return "No such template";
  return new Handlebars.SafeString(Template[this.view](this.data));
};




Template.iLayout.bodyColor = function() {
  if(!this.prefix) return '';
  var bulb = Impact.Dashboard.bulbPrefixes[this.prefix];
  if(!bulb) return '';
  return Impact.Dashboard.bulbColors[bulb];
};


Template.iLayout.bulbs = function() {

  if(!this.prefix) return [];

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

  for(var i = 0; i < tab.length; ++i) {
    if(tab[i].id === this.bulb) {
      tab[i].active = true;
    } else if(tab[i].active) {
      delete tab[i].active;
    }
  }

  return tab;

};


