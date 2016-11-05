import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';
import { post } from 'axios';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain, options) {
    super();
    // Configure Auth0
    let auth0LockOptions = Object.assign({}, options || {}, {
      //auth               : { redirectUrl: location + 'callback' },
      theme              : { primaryColor: '#b81b1c' },
      languageDictionary : { title: 'Roomly' }
    });
    this.lock = new Auth0Lock(clientId, domain, auth0LockOptions);
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    // navigate to the dashboard route
    browserHistory.replace('/dashboard');
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
        // send profile to server
        post('/api/user', { 'user_id': profile.user_id, profile: profile })
        .then(console.log.bind(console))
        .catch(console.log.bind(console));
      }
    });
  }

  _authorizationError(error) {
    // Unexpected authentication error
    console.log('Authentication Error', error);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile);
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    browserHistory.replace('/');
  }

  getUserId() {
    return this.getProfile().user_id;
  }
}
