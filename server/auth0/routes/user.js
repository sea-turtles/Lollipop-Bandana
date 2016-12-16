'use strict';

let express = require('express');
let passport = require('passport');
let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
let router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, (req, res, next) => {
  res.render('user', { user: req.user });
});

module.exports = router;
