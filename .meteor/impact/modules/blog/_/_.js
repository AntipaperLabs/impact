var blog = function() {};
var Blog = blog.prototype;

Blog.templates = {};


Blog.render = function(state) {
  state.getParams();
  return Blog.templates.list();
};

Impact.has.module('blog', blog);




console.log("LOADED BLOG _");