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
<<<<<<< HEAD:client/_/routes.js
  '/*':             function() {
                      Impact.Yield.enteredPath.apply(this, arguments);
                      return 'yield';
                    },
=======
  '/*':              function() {

    Impact.Yield.enteredPath.apply(Impact.Yield, arguments);
    return 'yield';
  },
>>>>>>> module-instances:client/_main/routes.js
});

