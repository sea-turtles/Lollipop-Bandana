'use strict';

const bodyParser = require('body-parser');

module.exports = app => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // POST /api/user
  app.post('/api/user', (req, res) => {
    console.log('Got user profile', req.body);
    res.sendStatus(200);
  });

};
