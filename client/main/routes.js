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
                      Impact.Yield.enteredPath(this, match);
                      return 'yield';
                    },
});

