////////////////////
/**/(function(){/**/
////////////////////




var Dashboard = function(){};

$functions(Dashboard, {
  enteredPath: function(context, fullPath) {
    var path = fullPath.split('/');
    this.path = path;
  },
});




Impact.Dashboard = new Dashboard();


////////////////////
/*********/})();/**/
////////////////////
