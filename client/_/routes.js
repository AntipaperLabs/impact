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
  '/*':             function() {
                      Impact.Yield.enteredPath.apply(Impact.Yield, arguments);
                      return 'yield';
                    },
});

