Template.show.article = function() {
  // console.log("SHOW ARTICLE", S('articleId'));
  // var article = Articles.findOne({_id: S('articleId')});
  // console.log("THIS ARTICLE: ", article);
  // return article;
  return Articles.findOne({_id: S('articleId')});
};

Template.show.editing = function () {
  return S('editing');
};

Template.show.events({
  'click input[value=edit]': function () {
    S('editing', true);
  },
  'click input[value=save]': function () {
    console.log(this);
    S('editing', false);
  },
});