module.exports = {
    '/user/login': {
      controller: 'user',
      method: 'login',
    //   policies: ['loggedIn']
    },
    '/user/logout': {
        controller: 'user',
        method: 'logout',
      },
      '/user/register': {
        controller: 'user',
        method: 'register',
      //   policies: ['auth.policy']
      },
      '/user/list': {
        controller: 'user',
        method: 'getAllUsers',
        policies: ['auth.policy']
      },
      '/user/update-location': {
        controller: 'user',
        method: 'saveLocation',
        policies: ['auth.policy']
      },      
      '/user/location/:user': {
        controller: 'user',
        method: 'getLocation',
        policies: ['auth.policy']
      },
      '/user/history/:user': {
        controller: 'user',
        method: 'travelHistory',
        policies: ['auth.policy']
      },
  };