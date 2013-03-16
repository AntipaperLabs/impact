(function(){new Impact.ModuleFactory('blog',{
loader:function(I){with(I){



////////////////////////////////////////
// blog/shared/model.js
////////////////////////////////////////




/*
  impact: {
    createdAt:
    updatedAt:
    createdBy:
    updatedBy:
    tags:
  }
  title:
  summary:
  notes:
  body:
  published: T/F
  publishedAt:
*/
var Articles = Collection('articles');


/*
  authorName:
  authorEmail:
  userId:

  createdAt:
  publishedAt:
  editedAt:
  
  published:
  forModeration:
  content:
*/
var Comments = Collection('comments');





////////////////////////////////////////
// blog/server/_fake.js
////////////////////////////////////////



if(!Articles.findOne({})) {

  // console.log("CREATE FAKE ARTICLES IN ", Articles);

  Articles.insert({
    title: 'How to recognize different kinds of trees?',
    body: 'A larch',                
  });
  Articles.insert({
    title: 'The parrot',
    body: 'Ex-parrot',
  });
  Articles.insert({
    title: 'Lovely Spam',
    body: 'Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam',
  });
  Articles.insert({
    title: 'I have a strange feeling of Deja Vu',
    body: 'I have a strange feeling of Deja Vu',
  });
  Articles.insert({
    title: 'It\'s...',
    body: '**SPANISH INQUISITION**',
  });
}






////////////////////////////////////////
// blog/server/article.js
////////////////////////////////////////



Methods({
  'createArticle': function(callback, article) {
    if(Permissions().deny('createArticle')) {
      throw 'You are not allowed to create articles';
    }
    return Articles.insert(article);
  }
});


// Functions({

//   'createArticle': function(callback, article) {
//     if(Permissions().deny('createArticle')) {
//       callback('You are not allowed to create articles');
//       return;
//     }
//     callback(false, Articles.insert(article));
//     return;
//   },

// });







////////////////////////////////////////
// blog/server/comment.js
////////////////////////////////////////



// Functions({


//   'addComment': function(callback, comment) {
//     if(Permissions().deny('createComment')) {
//       if(Permissions().deny('createModeratedComment')) {
//         callback('You are not allowed to comment');
//         return;
//       }
//       comment.published = false;
//       callback(false, Comments.insert(comment));
//       return;
//     }
//     comment.published = true;
//     callback(false, Comments.insert(comment));
//     return;
//   },


//   'publishComment': function(callback, comment) {
//     if(Permissions().deny('moderateComments')) {
//       callback('You are not allowed to alter comments');
//       return;
//     }
//     callback(false, Comments.update({_id: comment._id}, {$set: {published: true}});
//     return;
//   },


//   'unpublishComment': function(callback, comment) {
//     if(Permissions().deny('moderateComments')) {
//       callback('You are not allowed to alter comments');
//       return;
//     }
//     callback(false, Comments.update({_id: comment._id}, {$set: {published: false}});
//     return;
//   },


// });
//     





////////////////////////////////////////
// blog/server/publish.js
////////////////////////////////////////








};},
});})();
