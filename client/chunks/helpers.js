
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

  Handlebars.registerHelper('ShowChunk', function () {
    return new Handlebars.SafeString(renderTemplate(this, 'chunk-' + this.type + '-show'));
  });

  Handlebars.registerHelper('EditChunk', function () {
    return new Handlebars.SafeString(renderTemplate(this, 'chunk-' + this.type + '-edit'));
  });

})();
