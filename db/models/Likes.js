'use strict';

const dataBase = require('../index.js');

const addLike = function(like, userId) {
  const db = dataBase.connection;
  return db.query('SELECT id FROM Users WHERE id = ?', userId)
    .then(function(rows) {
      if (rows.length === 0) {
        throw 'Error: User not in database';
      } else {
        like.userId = userId;
        return db.query('INSERT INTO Likes SET ?', like);
      }
    });
};

module.exports.addLike = addLike;
