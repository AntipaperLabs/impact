////////////////////
/**/(function(){/**/
////////////////////




var Yield = function(){};

$functions(Yield, {
  enteredPath: function(context, fullPath) {
    var path = fullPath.split('/');
    this.path = path;
  },
});




Impact.Yield = new Yield();


////////////////////
/*********/})();/**/
////////////////////
