'use strict';

const bodyParser = require('body-parser');

module.exports = app => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // POST /api/search
  app.post('/api/search', (req, res) => {
    console.log('Got search criteria', req.body);
    
    let results = [ { user: 'michael' }, { user: 'phil' }, { user: 'matthew' } ];
    res.status(200).json(results);
  });

};
