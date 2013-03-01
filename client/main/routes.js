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
  '/*':             function(match) {
                      Impact.Yield.enteredPath(this, match);
                      return 'yield';
                    },
});

