
Template.iLayout.yield = function() {

  console.log("LAYOUT ", this);
  if(! this.view) return "No such view";
  if(! Template[this.view]) return "No such template";
  return new Handlebars.SafeString(Template[this.view](this.data));
};

