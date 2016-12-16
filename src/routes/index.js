//import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import HomeRoute from './Home';
import LoginRoute from './Login';
import DashboardRoute from './Secure/Dashboard';
import SettingsRoute from './Secure/Settings';
import NotFound from './NotFound';
import { auth } from '../auth0/auth';
import CounterRoute from './Counter';

export const createRoutes = (store) => {
  const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
      replace({ pathname: '/' });
    }
  };

  const requirePublic = (nextState, replace) => {
    if (auth.loggedIn()) {
      replace({ pathname: '/dashboard' });
    }
  };

  return ({
    path        : '/',
    indexRoute  : HomeRoute(store),
    childRoutes : [
      {
        onEnter     : requireAuth,
        component   : CoreLayout,
        childRoutes : [
          DashboardRoute(store),
          SettingsRoute(store)
        ]
      },
      {
        path       : '*',
        indexRoute : NotFound,
        status     : 404
      }
    ]
  });
};

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
