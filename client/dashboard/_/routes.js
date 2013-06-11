



Impact.Dashboard.routes = {

  '/-site': {view: 'iHome', bulb: 'home'},
  '/-site/home': {view: 'iHome', bulb: 'home'},
  '/-site/theme': {view: 'iTheme', bulb: 'theme'},
  '/-site/themes': {view: 'iThemes', bulb: 'themes'},

  '/-modules': {view: 'iModules', bulb: 'manage'},
  '/-module/:name': function(params) {
    return {
      view: 'iModule',
      bulb: 'm:' + params.name,
      data: { moduleName: params.name },
    };
  },
  '/-modules/manage': {view: 'iModules', bulb: 'manage'},

  '/-users': {view: 'iRoles', bulb: 'roles'},
  '/-users/roles': {view: 'iRoles', bulb: 'roles'},
  '/-users/list': {view: 'iUsers', bulb: 'list'},

  '/-media': {view: 'iMedia', bulb: 'storages'},
  '/-media/storages': {view: 'iMedia', bulb: 'storages'},
  
};


Impact.Dashboard.bulbs = {

  site: [
    {title: 'Home', icon: 'Ç', url: '/-site/home', id: 'home'},
    {title: 'Theme', icon: ':', url: '/-site/theme', id: 'theme'},
    {title: 'Themes', icon: 'l', url: '/-site/themes', id: 'themes'},
  ],

  modules: [
    {title: 'Manage', icon: 'Ĥ', url: '/-modules/manage', id: 'manage'},
    {load: '/-module'},
  ],

  users: [
    {title: 'Roles', icon: 'ġ', url: '/-users/roles', id: 'roles'},
    {title: 'List', icon: 'Ü', url: '/-users/list', id: 'list'},
  ],

  media: [
    {title: 'Storages', icon: '@', url: '/-media/storages', id: 'storages'},
    {load: '/-storage'},
  ],

};


Impact.Dashboard.bulbPrefixes = {
  '-site': 'site',
  '-modules': 'modules',
  '-module': 'modules',
  '-users': 'users',
  '-media': 'media',
  '-storage': 'media',
};


Impact.Dashboard.bulbColors = {
  'site': 'dashboard-body-red',
  'modules': 'dashboard-body-yellow',
  'users': 'dashboard-body-blue',
  'media': 'dashboard-body-violet',
};



