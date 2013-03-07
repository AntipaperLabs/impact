Handlebars.registerHelper('applicationLoaded', function(options){
  return options.fn(this);
  // if(ImpactData.findOne({})) return options.fn(this);
  // if(Impact.settings) return options.fn(this);

  // return options.inverse(this);
});
