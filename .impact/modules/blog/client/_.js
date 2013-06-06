// exports
// Name
// S
// Template
// Collection
// Privileges

exports.routes = function(state) {
  return state.matchRoute({
    '/':                  { view: 'list' },
    '/new':               { view: 'new' },
    '/:title/:id':        function(path) {
                            S('articleId', path[2]);
                            return 'show';
                          },
    '/:title/:id/edit':   function(path) {
                            S('articleId', path[2]);
                            return 'edit';
                          }
  });
};

exports.render = function(view, data) {
  console.log(view, data);
  return new Handlebars.SafeString(Template[view](data));
};
