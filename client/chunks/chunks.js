
var getChunkContent = null;

(function () {

  getChunkContent = function (node, type) {
    switch (type) {
      case 'text': case 'math':
        return $(node).find('textarea').attr('value');
      default:
        return '';
    }
  };

})();