Meteor.startup(function(){
  
  
  Documents.remove({});
  Versions.remove({});
  Comments.remove({});

  Modules.remove({});
  Roles.remove({});

  var vid0 = Versions.insert({
    metadata: {},
    chunks: [
      {type: 'text', content: 'Lorem ipsum siabada mydełko fa.'},
      {type: 'text', content: 'Czterech kominiarzy zjadło ogromne wiadro bigosu.'},
    ],
  });
  var vid1 = Versions.insert({
    metadata: {},
    chunks: [
      {type: 'text', content: 'Lorem ipsum siabada mydełko fa.'},
      {type: 'text', content: 'Czterech kominiarzy zjadło ogromne wiadro bigosu.'},
      {type: 'text', content: 'No a potem mieli wzdęcia.'},
    ],
  });
  Documents.insert({
    moduleName: 'news',
    currentVersionId: vid1,
    versions: [
      {createdAt: 0, createdBy: 0, id: vid0, notes: 'Initial version'},
      {createdAt: 1234560, createdBy: 0, id: vid1, notes: 'Added ending'},
    ],
    comments: [],
    tags: []
  })


  var vid2 = Versions.insert({
    metadata: {},
    chunks: [
      {type: 'text', content: 'Karafka wypełniona płynem.'},
      {type: 'text', content: 'Hiszpańska Inkwizycja.'},
    ],
  });
  var vid3 = Versions.insert({
    metadata: {},
    chunks: [
      {type: 'text', content: 'Karafka wypełniona niebieskim płynem.'},
      {type: 'text', content: 'Hiszpańska Inkwizycja.'},
    ],
  });
  var vid4 = Versions.insert({
    metadata: {},
    chunks: [
      {type: 'text', content: 'Karafka wypełniona płynem.'},
      {type: 'text', content: 'Hiszpańska Inkwizycja.'},
      {type: 'text', content: 'Co dalej? ...'},
    ],
  });
  Documents.insert({
    moduleName: 'news',
    currentVersionId: vid3,
    versions: [
      {createdAt: 2222220, createdBy: 0, id: vid2, notes: 'Initial version'},
      {createdAt: 2222330, createdBy: 0, id: vid3, notes: 'Added description'},
      {createdAt: 2444440, createdBy: 0, id: vid4, notes: 'Thinking about more details'},
    ],
    comments: [],
    tags: []
  })


  Modules.insert({name: 'news', module: 'blog'});
  Modules.insert({name: 'page', module: 'static'});

});