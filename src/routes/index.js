// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import Home from './Home';
import AppRoute from './App';
import ProfileRoute from './Profile';
import LoginRoute from './Login';
import DashboardRoute from './Secure/Dashboard';
import NotFound from './NotFound';
import AuthService from '../auth0/utils/AuthService';

// FIXME: move codes in a different file
const auth = new AuthService('0xwwsj6Zcwrl3g73CaVnNBqimlcYFUev', 'roomly.auth0.com');

export const createRoutes = (store) => {
  const requireAuth = (nextState, replace) => {
    if (!auth.loggedIn()) {
      replace({ pathname: '/login' });
    }
  };

  const requirePublic = (nextState, replace) => {
    if (auth.loggedIn()) {
      replace({ pathname: '/dashboard' });
    }
  };

  return ({
    path        : '/',
    indexRoute  : Home,
    component   : CoreLayout,
    auth        : auth, // pass authentication service
    childRoutes : [
      {
        onEnter    : requireAuth,
        childRoutes: [
          DashboardRoute(store)
        ]
      },
      {
        onEnter     : requirePublic,
        childRoutes : [
          LoginRoute(store)
        ]
      },
      {
        path: '*',
        indexRoute: NotFound,
        status: 404
      }
    ]
  });
};

// import Profile from "./components/Profile.jsx";
// import NotFound from "./components/NotFound.jsx";
// import BaseForm from "./components/BaseForm.jsx";
// import Have from "./components/baseform/Have.jsx";
// import Looking from "./components/baseform/Looking.jsx";

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
