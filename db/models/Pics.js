'use strict';

const dataBase = require('../index.js');

const addPic = function(pic, houseId) {
  const db = dataBase.connection;
  return db.query('SELECT id FROM Houses WHERE id = ?', houseId)
    .then(function(rows) {
      if (rows.length === 0) {
        throw 'Error: User not in database';
      } else {
        pic.houseId = houseId;
        return db.query('INSERT INTO Pics SET ?', pic);
      }
    });
};

module.exports.addPic = addPic;
