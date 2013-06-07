



Impact.Dashboard.routes = {



  '/-dashboard': {view: 'iDashboard'},

  '/-site': {view: 'iSite'},

  '/-modules': {view: 'iModules'},

  '/-module/:name': function(params) {
    return {
      view: 'iModule',
      data: { moduleName: params.name },
    };
  },

  '/-home': {view: 'iHome'},

  '/-media': {view: 'iMedia'},

  '/-modules': {view: 'iModules'},

  '/-roles': {view: 'iRoles'},

  '/-themes': {view: 'iThemes'},

  '/-users': {view: 'iUsers'},

};

Impact.Dashboard.tabs = {

  'site': [
    ['home', 'H', '/-home'],
    ['theme', 't', '/-theme'],
    ['themes', 'T', '/-themes'],
  ],

  'modules': [
    ['manage', 'M', '/-modules'],
    'space',
    {load: 'modules'},
  ],

  'users': [
    ['roles', 'R', '/-roles'],
    ['users', 'U', '/-users'],
  ],

  'media': [
    ['storage', 'S', '/-storage'],
    'space',
    {load: 'storage'},
  ],

};


