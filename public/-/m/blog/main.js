(function(){


  var Blog = function(name){
    this.name = name;

    this.render = function(params) {
      return "BLOG(" + this.name + ")[" + params + "]";
    }

  };

  var BlogFactory = function() {
    this.initialize = function(name) {
      Impact.Modules[name].it = new Blog(name);
    };
  };

  Impact.ModuleTemplates['blog'] = new BlogFactory();

})();
