var fakeDocument = function() {
  var sentences = [
    'Siabada mydełko fa. ',
    'Nasturcje rosną. ',
    'Ole ole cztery pomidory. ',
    'Jarmark był bardzo radosnym wydarzeniem. ',
    'Trup ściele się gęsto. ',
    'Kaszankę się zjadło a teraz jest kaszka. ',
    'Doroczna zabawa w przetaczanie jeżozwierzy przeciągnęła się do późnego popołudnia. ',
    'Jutro nie. ',
    'Nieokiełznany bełkot zarządził wczorajszy strach nad samowarem. ',
    'Lorem ipsum siabada mydełko fa. ',
    'Czterech kominiarzy zjadło ogromne wiadro bigosu. ',
    'No a potem mieli wzdęcia. ',
  ];

  var s = function(x) {
    var r = '';
    for(var ri = 0; ri < (x||8); ++ri) {
      r += sentences[Math.floor(Math.random() * sentences.length)];
    }
    return r;
  }


  var doc, v0, v1, v2;

  var t = s(1);
  var s1 = s();
  var s2 = s();
  var s3 = s(6);
  var s2x1 = s2 + s(3);

  doc = Documents.insert({
    moduleName: 'news',

    meta: {},
    head: {title: t},
    body: [
      {type: 'text', content: s1},
      {type: 'text', content: s2x1},
      {type: 'text', content: s3},
    ],

    versions: [],
    tags: [],
    chunks: []
  });

  v0 = Versions.insert({
    documentId: doc,
    createdAt: 1000,
    createdBy: 0,
    memo: 'Initial version.',

    meta: {},
    head: {title: t},
    body: [
      {type: 'text', content: s1},
      {type: 'text', content: s2},
    ],
  });

  v1 = Versions.insert({
    documentId: doc,
    createdAt: 23000,
    createdBy: 0,
    memo: 'Ending added.',

    meta: {},
    head: {title: t},
    body: [
      {type: 'text', content: s1},
      {type: 'text', content: s2},
      {type: 'text', content: s3},
    ],
  });

  v2 = Versions.insert({
    documentId: doc,
    createdAt: 7923000,
    createdBy: 0,
    memo: 'Ending added.',

    meta: {},
    head: {},
    body: [
      {type: 'text', content: s1},
      {type: 'text', content: s2x1},
      {type: 'text', content: s3},
    ],
  });

  Documents.update({_id: doc}, {$set: {versions: [v0, v1, v2]}});


}




Meteor.startup(function(){
  
  
  Documents.remove({});
  Versions.remove({});
  Notes.remove({});

  Modules.remove({});
  Roles.remove({});



  (8).times(fakeDocument);


  Modules.insert({name: 'news', module: 'blog'});
  Modules.insert({name: 'page', module: 'static'});
  Modules.insert({name: 'fake', module: 'fake'});

});







