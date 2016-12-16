'use strict';

const dataBase = require('../index.js');

const addWant = function(want, userId) {
  const db = dataBase.connection;
  return db.query('SELECT id FROM Users WHERE id = ?', userId)
    .then(function(rows) {
      if (rows.length === 0) {
        throw 'Error: User not in database';
      } else {
        want.userId = userId;
        return db.query('INSERT INTO Wants SET ?', want);
      }
    });
};

module.exports.addWant = addWant;
