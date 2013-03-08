// exports
// Name
// S
// Template
// Collection
// Privileges

exports.routes = function(state) {
  return state.matchRoute({
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
}

// exports.render = function(state) {

//   //#  /                      -> list
//   //#  /articleTitle/id       -> show
//   //#  /articleTitle/id/edit  -> edit

//   var template = state.matchRoute({
//     '/':                  'list',
//     '/:title/:id':        function(title, id) {
//                             S('articleId', id);
//                             return 'show';
//                           },
//     '/:title/:id/edit':   function(title, id) {
//                             S('articleId', id);
//                             return 'edit';
//                           }
//   });
  
//   if(!template) return "ERROR";
//   return Template[template]();
// };

