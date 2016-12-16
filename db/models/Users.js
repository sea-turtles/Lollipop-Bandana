'use strict';

const dataBase = require('../index.js');

const addUser = function(user) {
  const db = dataBase.connection;
  return db.query('SELECT * FROM Users WHERE id = ?', user.id)
    .then(function(rows) {
      if (rows.length === 0) {
        return db.query('INSERT INTO Users SET ?', user);
      } else {
        throw 'Error: User already in database';
      }
    });
};

module.exports.addUser = addUser;
