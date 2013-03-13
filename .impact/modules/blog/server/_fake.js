
if(!Articles.findOne({})) {

  // console.log("CREATE FAKE ARTICLES IN ", Articles);
  Articles.insert({
    title: 'How to recognize different kinds of trees?',
    body: [
      {
          type: 'text', 
          content: 'The larch',
      }
    ],
  });
  Articles.insert({
    title: 'The parrot',
    body: [
      {
          type: 'text', 
          content: 'Ex-parrot',
      }
    ],
  });
  Articles.insert({
    title: 'Lovely Spam',
    body: [
      {
          type: 'text', 
          content: 'Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam Spam',
      }
    ],
  });
  Articles.insert({
    title: 'I have a strange feeling of Deja Vu',
    body: [
      {
          type: 'text', 
          content: 'I have a strange feeling of Deja Vu',
      }
    ],
  });
  Articles.insert({
    title: 'It\'s...',
    body: [
      {
          type: 'text', 
          content: '**SPANISH INQUISITION**',
      }
    ],
  });
}
