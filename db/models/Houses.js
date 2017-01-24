'use strict';

const dataBase = require('../index.js');

const addHouse = function(house, userId) {
  const db = dataBase.connection;
  return db.query('SELECT id FROM Users WHERE id = ?', userId)
    .then(function(rows) {
      if (rows.length === 0) {
        throw 'Error: User not in database';
      } else {
        house.userId = userId;
        return db.query('INSERT INTO Houses SET ?', house);
      }
    });
};
const addUpdateHouse = function(house, userId) {
  const db = dataBase.connection;
  return db.query('SELECT id FROM Houses WHERE userId = ?', userId)
    .then(function(rows) {
      if (rows.length === 0) {
        return addhouse(house, userId);
      } else {
        let houseId = rows[0].id;
        return db.query('UPDATE Houses SET title = ?, addressOne = ?, addressTwo = ?, city = ?, state = ?, description = ?, price = ?, openRooms = ?, capacity = ?, smoking = ?, pets = ?, genderPref = ? WHERE id = ?', [house.title, house.addressOne, house.addressTwo, house.city, house.state, house.description, house.price, house.openRooms, house.capacity, house.smoking, house.pets, house.genderPref, houseId]);
      }
    });
};


module.exports.addHouse = addHouse;
module.exports.addUpdateHouse = addUpdateHouse;
