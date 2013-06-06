
(function () {

  var errorMessage = function (chunk) {
    return '<p>Cannot render chunk of type **' + chunk.type + '**</p>';
  };

  var renderTemplate = function (data, templateName) {
    var template = Template[templateName];
    if (template)
      return template(data);
    return errorMessage(data);
  };

  Handlebars.registerHelper('showChunk', function (context, options) {
    if (!options) { options = context; context = this }
    //-------------------------------------------------
    if (!_.isEmpty(options.hash))
      //TODO: do we really need to clone this?
      context = _.defaults(_.clone(options.hash), context);
    return new Handlebars.SafeString(renderTemplate(context, 'chunk-' + context.type + '-show'));
  });

  Handlebars.registerHelper('editChunk', function () {
    return new Handlebars.SafeString(renderTemplate(this, 'chunk-' + this.type + '-edit'));
  });

  Handlebars.registerHelper('chunkToolbar', function () {
    return new Handlebars.SafeString(renderTemplate(this, 'chunkToolbar'));
  });

  var getContent = function (data) {
    if (!_.isObject(data.data))
      return data.content;
    //---------------------------------------------------------
    return data.content.replace(/@[\w\d]+/g, function (match) {
      return data.data[match.substring(1)] || '[unknown]';
    });
  };

  Template['chunk-math-show'].helpers({
    content: function () { return getContent(this); },
  });

})();
