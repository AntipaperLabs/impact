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
  '*':              function(path) {

    Impact.Yield.enteredPath(path);
    return 'yield';
  },
});

