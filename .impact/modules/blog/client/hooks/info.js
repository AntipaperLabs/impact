
DataSource('info', function (articleId) {
  this.subscribe('info', articleId, function () {
    var article = Articles.findOne({_id:articleId});
    if (article) {
      this.ready({
        title   : article.title,
        summary : article.summary,
      });
    }
  });
});
