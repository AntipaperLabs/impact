
exports.render = function(state) {
  //#  /                      -> list
  //#  /articleTitle/id       -> show
  //#  /articleTitle/id/edit  -> edit

  var template = Impact.mrouter(state.getPath(), {
    '/':                  'list',
    '/:title/:id':        function(title, id) {
                            S('articleId', id);
                            return 'show';
                          },
    '/:title/:id/edit':   function(title, id) {
                            S('articleId', id);
                            return 'edit';
                          }
  });

  return Template[template]();
  // if(state.getPath().length == 0) {

  // } else if(state.getPath()[0] == )
  // console.log("RENDERING BLOG");
  // return "<div>TAK WYGLĄDA BLOG!</div>";
};

console.log("LOADED BLOG _");
