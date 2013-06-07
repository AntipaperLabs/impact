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
    '/:title/:id':        function(p) {
      console.log("PID", p);
                            return {
                              view: 'show',
                              data: {articleId: p.id}
                            }
                          },
    '/:title/:id/edit':   function(p) {
                            return {
                              view: 'edit',
                              data: {articleId: p.id}
                            }
                          },
  });
};

exports.render = function(view, data) {
  console.log(view, data);
  return new Handlebars.SafeString(Template[view](data));
};
