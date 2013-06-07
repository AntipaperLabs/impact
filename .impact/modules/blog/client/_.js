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
    '/:title/:id':        function(params) {
                            S('articleId', id);
                            return 'show';
                          },
    '/:title/:id/edit':   function(params) {
                            S('articleId', id);
                            return 'edit';
                          }
  });
};

exports.render = function(view, data) {
  console.log('rendering view', view);
  //return new Handlebars.SafeString(Template[view](data));
};
