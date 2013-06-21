
DataSource('link', function (articleId) {
  var handle = DataHandle('link', articleId);
  var self = this;
  handle.ready(function (article) {
    self.ready({
      name: article.title,
      //TODO: hypenize title
      href: '/' + Name + '/' + article.title + '/' + articleId,
    });
  });
  self.onStop(function () {
    handle.stop();
  });
});
