Template.new.events({
  'click #submit': function(e) {
    var title = $('#newArticleForm').find('#title').val();
    var content = $('#newArticleForm').find('#content').val();
    Method('createArticle', {title: title, content: content}, function(error, result) {
      console.log("CALLBACK RECEIVED");
      console.log("E|",error);
      console.log("R|",result);
    });
    // console.log("T|",title);
    // console.log("C|",content);
    console.log("SUBMITTED");
  },
});
