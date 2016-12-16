'use strict';

let express = require('express');
let passport = require('passport');
let router = express.Router();

let env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express', env: env });
});

router.get('/login',
  (req, res) => {
    res.render('login', { env: env });
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/user');
  });

module.exports = router;
