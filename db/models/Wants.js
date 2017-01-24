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

const addUpdateWant = function(want, userId) {
  const db = dataBase.connection;
  return db.query('SELECT id FROM Wants WHERE userId = ?', userId)
    .then(function(rows) {
      if (rows.length === 0) {
        return addWant(want, userId);
      } else {
        let wantId = rows[0].id;
        return db.query('UPDATE Wants SET city = ?, state = ?, smoking = ?, pets = ?, minPrice = ?, maxPrice = ? WHERE id = ?', [want.city, want.state, want.smoking, want.pets, want.minPrice, want.maxPrice, wantId])
      }
    });
};

module.exports.addWant = addWant;
module.exports.addUpdateWant = addUpdateWant;
