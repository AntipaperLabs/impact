Template.show.article = function() {
  return Articles.findOne(this.articleId);
};

Template.show.chunks = function() {
  console.log("CHU", this);
  var article = Articles.findOne(this._id);
  if (article.chunks)
    return article.chunks;
  return [
    { type: 'text', content: article.body, },
  ];
};
