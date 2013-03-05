Functions({


  'addComment': function(callback, comment) {
    if(Permissions().deny('createComment')) {
      if(Permissions().deny('createModeratedComment')) {
        callback('You are not allowed to comment');
        return;
      }
      comment.published = false;
      callback(false, Comments.insert(comment));
      return;
    }
    comment.published = true;
    callback(false, Comments.insert(comment));
    return;
  },


  'publishComment': function(callback, comment) {
    if(Permissions().deny('moderateComments')) {
      callback('You are not allowed to alter comments');
      return;
    }
    callback(false, Comments.update({_id: comment._id}, {$set: {published: true}});
    return;
  },


  'unpublishComment': function(callback, comment) {
    if(Permissions().deny('moderateComments')) {
      callback('You are not allowed to alter comments');
      return;
    }
    callback(false, Comments.update({_id: comment._id}, {$set: {published: false}});
    return;
  },


});
    