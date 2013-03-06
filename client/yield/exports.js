(function () {

  Impact.Exports = function (options) {
    options = options || {};
    if (options.errors instanceof Array)
        this.errors = options.errors;
    else if (options.errors instanceof Object)
        this.errors = [options.errors, ]
    else
        this.errors = [];
  };

  $functions(Impact.Exports, {
    addError : function (message, reason) {
      this.errors.push({message:message, reason:reason});
    },

    eachError: function (action) {
      for (var i=0; i<this.errors.length; i++) {
        var err = this.errors[i];
        action.call(this, err.message, err.reason);
      }
    },

    copyErrors: function (exports) {
      var self = this;
      exports.eachError(function (message, reason) {
        self.addError(message, reason);
      });
    },
  });

})();
