
exports.render = function(state) {
  //#  /                      -> list
  //#  /articleTitle/id       -> show
  //#  /articleTitle/id/edit  -> edit

  console.log("IN RENDER: state.path ", state.getPath());
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
  if(!template) return "ERROR";

  console.log("Rendering template", template);
  return Template[template]();
  // if(state.getPath().length == 0) {

  // } else if(state.getPath()[0] == )
  // console.log("RENDERING BLOG");
  // return "<div>TAK WYGLĄDA BLOG!</div>";
};

