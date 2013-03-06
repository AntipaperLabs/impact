Meteor.Router.add({
  // '/-documents':    'iDocuments',
  // '/-media':        'iMedia',
  // '/-shortcuts':    'iShortcuts',  
  // '/-modules':      'iModules',
  // '/-themes':       'iThemes',
  // '/-roles':        'iRoles',
  // '/-users':        'iUsers',
  // '/-':             'iDashboard',
  // '/':              'iHome',
  '/':              'home',
  '/-/*':           function() {console.log("ERROR 404"); return 'error404';},
  '/-*':            function(match) {
                      if(!Meteor.user()) return 'login';
                      Impact.Dashboard.enteredPath(this, match);
                      return 'dashboard';
                    },
  '/*':             function(match) {
                      Impact.Yield.requestedModuleName = match.split('/')[0];
                      Impact.Yield.updateState(this, match);
                      // console.log("REQUESTED MODULE "+Impact.Yield.requestedModuleName);
                      // Impact.Yield.enteredPath(this, match);
                      return 'yield';
                    },
});

// catch all local links

Meteor.startup(function () {
  $(document).on('click', 'a[href]', function (event) {
    var href = this.href;
    var baseURL = window.location.protocol + '//' + window.location.host;
    var match = href.match(baseURL + '(.*)');
    if (match && match[1] !== undefined) {
      Meteor.Router.to(match[1]);
      if (event.preventDefault)
        event.preventDefault();
    }
  });
});

