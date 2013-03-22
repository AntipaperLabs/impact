Template.show.article = function() {
  console.log("SHOW ARTICLE", S('articleId'));
  // var article = Articles.findOne({_id: S('articleId')});
  // console.log("THIS ARTICLE: ", article);
  // return article;
  return Articles.findOne({_id: S('articleId')});
};