

Handlebars.registerHelper('hyphenize', function(string) {
  return string.toLowerCase()
                // replace all non-alphanumeric characters with the hyphen
                .replace(/[^a-z0-9]+/g, '-')
                // replace multiple instances of the hyphen with a single instance
                .replace(/-+/g, '-')
                // trim leading and trailing hyphens
                .replace(/^-+|-+$/g, ''); 
});

