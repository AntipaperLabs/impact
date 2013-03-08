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
