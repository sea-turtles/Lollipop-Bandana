'use strict';

module.exports = {

  config: app => {

    let path = require('path');
    let favicon = require('serve-favicon');
    let logger = require('morgan');
    let cookieParser = require('cookie-parser');
    let bodyParser = require('body-parser');
    let session = require('express-session');
    let dotenv = require('dotenv');
    let passport = require('passport');
    let Auth0Strategy = require('passport-auth0');

    // load env vars from config/.env
    dotenv.config({ path: __dirname + '/config/.env' });

    // Configure Passport to use Auth0
    var strategy = new Auth0Strategy({
      domain:       process.env.AUTH0_DOMAIN,
      clientID:     process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback' // FIXME
    }, (accessToken, refreshToken, extraParams, profile, done) => {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      return done(null, profile);
    });

    passport.use(strategy);

    // This can be used to keep a smaller payload
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // FIXME: uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
      secret: 'My roommates will never know my secret',
      resave: true,
      saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(express.static(path.join(__dirname, 'public')));
  },

  routes: app => {
    let routes = require('./routes/index');
    let user = require('./routes/user');

    app.use('/', routes);
    app.use('/user', user);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  }

};
