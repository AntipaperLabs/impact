////////////////////
/**/(function(){/**/
////////////////////


var Blog = function(name) {
  this.name = name;
  for(var key in Impact.dev.Modules.Blog.load) {
    Impact.dev.Modules.Blog.load[key](this);
  }
};


Impact.dev.moduleConstructors['blog'] = Blog;



////////////////////
/***********/});/**/
////////////////////