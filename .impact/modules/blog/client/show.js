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
  'click input[value=save]': function (event, template) {
    S('editing', false);
    var body = [];
    template.findAll('.chunk').forEach(function (node) {
      var type = node.getAttribute('data-type');
      body.push({
        type    : type,
        content : Module.getChunkContent(node, type),
      });
    });
    Articles.update({_id:this._id},{$set:{body:body}});
  },
});