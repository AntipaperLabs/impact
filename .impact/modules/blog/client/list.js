
Template.list.articles = function() {
  return Articles.find({});
}

Template.list.events({
  'click input[value=add]': function () {
    Articles.insert({
      title : 'some math article',
      body  : [
        {
          type: 'text',
          content: 'this is article with math content',
        },
        {
          type: 'math',
          content: 'some math content: $x^2+y^2=z^2$',
        },
      ]
    });
  }
});
