(function(){



////////////////////////////////////////
// blog/server/entry.js
////////////////////////////////////////



Functions({
  'createEntry': function(callback, article) {
    var permissions = GetPermissions();
    if(permissions.deny('create')) {
      callback('You are not allowed to create articles');
      return;
    }
    var id = Documents.insert(article);
    callback(false, id);
  },
});






})();
