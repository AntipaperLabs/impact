(function () {

  //TODO: better loading messages
  //TODO: put the loader code somewhere else

  var lock = false, listeners = [];

  var requireMathJax = function (action) {
    if (window.MathJax === undefined) {
      listeners.push(action);
      if (!lock) {
        lock = true;
        $.ajax({
          url: 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
          type: 'GET',
          dataType: 'script',
        }).done(function (msg) {
          if (window.MathJax !== undefined) {
            // config mathjax
            MathJax.Hub.Config({
              showProcessingMessages: false,
              tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] }
            });
            // run all listeners
            for (var i=0; i<listeners.length; i++)
              listeners[i](window.MathJax);
          } else {
            console.log('ERROR: MathJax failed to load...');
          }
        }).fail(function (jqXHR, textStatus) {
          console.log('ERROR: unable to load MathJax source code...');
        });
      }
    } else {
      action(window.MathJax);
    }
  };

  Template['chunk-math-show'].rendered = function () {
    var self = this;
    requireMathJax(function (MathJax) {
      MathJax.Hub.Queue(
        ["Typeset", MathJax.Hub, self.findAll()]
      );
    });
  };

})();

