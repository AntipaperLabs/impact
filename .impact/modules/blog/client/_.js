// exports
// Name
// S
// Template
// Collection
// Privileges

exports.routes = function(state) {
  return state.matchRoute({
    '/':                  'list',
    '/new':               'new',
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
