Meteor.Router.add({
  '/-documents':    'iDocuments',
  '/-media':        'iMedia',
  '/-shortcuts':    'iShortcuts',  
  '/-modules':      'iModules',
  '/-themes':       'iThemes',
  '/-roles':        'iRoles',
  '/-users':        'iUsers',
  '/-':             'iDashboard',
  '/':              'iHome',
  '/-/*':           function() {console.log("ERROR 404"); return 'error404';},
  '/*':             function(match) {
                      Impact.Yield.enteredPath(this, match);
                      return 'yield';
                    },
});

