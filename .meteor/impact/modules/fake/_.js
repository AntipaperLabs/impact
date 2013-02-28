

Template.base.items = ['a','b','c','d'];

Template.base.documents = function () {
  return Documents.find({});
};

Template.base.events({
  'click li': function (event) {
    var self = this;
    $(event.target).hide(200, function() {
      Documents.remove({_id:self._id});
    });
    console.log('removing', this.content);
  },
  'click input': function (event) {
    Documents.insert({content:'jakiś niemądry tekst'});
  },
});

exports.render = function (state) {
  var path   = state.getPath();
  var params = state.getParams();
  console.log('renderd with state', path, params.fetch());
  return Template.base();
};