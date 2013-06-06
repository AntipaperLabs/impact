////////////////////
/**/(function(){/**/
////////////////////


Meteor.Router.add({
  // '/-documents':    'iDocuments',
  // '/-media':        'iMedia',
  // '/-shortcuts':    'iShortcuts',  
   '/-modules':      'iModules',
  // '/-themes':       'iThemes',
  // '/-roles':        'iRoles',
  // '/-users':        'iUsers',
  // '/-':             'iDashboard',
  // '/':              'iHome',
  '/':              'home',
  '/-/*':           function() {console.log("ERROR 404"); return 'error404';},
  '/-*':            function(match) {
                      console.log("ENTER DASHBOARD @", match);
                      if(!Meteor.user()) return 'login';
                      Impact.Dashboard.enteredPath(this, match);
                      return 'dashboard';
                    },
  '/*':             function(match) {
                      Impact.Yield.enteredPath(this, match);
                      return 'yield';
                    },
});

// catch all local links

Meteor.startup(function () {
  $(document).on('click', 'a[href]', function (event) {
    console.log("EVENT FOUND, key:", event.which);
    if(event.which == 2) return false;
    var href = this.getAttribute('href');
    console.log("ROUTE TO:", href);
    // console.log("h2", $(this).attr('href'));
    // console.log("h3", this.getAttribute('href'));
    // var baseURL = window.location.protocol + '//' + window.location.host;
    // var match = href.match(baseURL + '(.*)');
    if(href.startsWith('/')) {
      console.log("PREVENT DEFAULT");
      Meteor.Router.to(href);
      if(event.preventDefault) event.preventDefault();
    }
  });
});



////////////////////
/*********/})();/**/
////////////////////
