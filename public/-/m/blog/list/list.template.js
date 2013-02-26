Blog.templates.list = function() {
  return "<div>" + this.documents().reduce(function(res, doc){
    return res + Blog.template.listItem(doc);
  }, "") +"</div>";
};


Blog.templates.listItem = function(item) {
  return "<div>" + item.head.title + "</div>";
}



console.log("LOADED BLOG LIST TEMPLATE");

