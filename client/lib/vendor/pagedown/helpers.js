
Handlebars.registerHelper('pagedown', function (text) {
	var converter = new Markdown.Converter ();
	return new Handlebars.SafeString(converter.makeHtml(text || ''));
});
