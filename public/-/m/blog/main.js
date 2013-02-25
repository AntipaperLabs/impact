(function(name){


  var Blog = function(name){
    this.name = name;

    this.render = function(params) {
      return "BLOG(" + this.name + ")[" + params + "]";
    }
  };


  Impact.moduleConstructor['blog'] = Blog;

  // var BlogFactory = function() {
  //   this.initialize = function(name) {
     
  //   };
  // };
  // Impact.createModuleInstances('blog', Blog);

   // Impact.Modules[name].it = new Blog(name);
  //Impact.ModuleTemplates['blog'] = new BlogFactory();

})();
