var blog = function() {};
var Blog = blog.prototype;

Blog.templates = {};


Blog.render = function(state) {
  console.log("RENDERING BLOG");
  console.log(state);
  // state.getParams();
  return "<div>TAK WYGLĄDA BLOG!</div>";
  // return Blog.templates.list();
};

Impact.has.module('blog', blog);




console.log("LOADED BLOG _");