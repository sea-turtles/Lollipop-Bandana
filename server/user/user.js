'use strict';

const bodyParser = require('body-parser');

module.exports = app => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // POST /api/user
  app.post('/api/user', (req, res) => {
    console.log('Got user profile HEY HEY', req.body.profile.name);
    res.status(200).json(req.body);
  });

};
