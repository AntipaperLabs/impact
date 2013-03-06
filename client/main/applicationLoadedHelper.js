Handlebars.registerHelper('applicationLoaded', function(options){
  if(Impact.settings || ImpactData.findOne({})) return options.fn(this);
  return options.inverse(this);
});
