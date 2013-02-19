Meteor.startup(function(){
  Modules.remove({});

  Modules.insert({name: 'news', module: 'blog'});
  Modules.insert({name: 'page', module: 'static'});

});