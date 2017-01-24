var expect = require('chai').expect;
var Promise = require('bluebird');
var mysql = require('promise-mysql');
var addUser = require('../../db/models/Users.js').addUser;
var addFriend = require('../../db/models/Friends.js').addFriend;
var addHouse = require('../../db/models/Houses.js').addHouse;
var addLike = require('../../db/models/Likes.js').addLike;
var addPic = require('../../db/models/Pics.js').addPic;
var addWant = require('../../db/models/Wants.js').addWant;
var addUpdateWant = require('../../db/models/Wants.js').addUpdateWant;
var addUpdateHouse = require('../../db/models/Houses.js').addUpdateHouse;

// Dummy data
var db;
var Fred = {
  id: 1,
  userName: 'Fred',
  profPic: 'test',
  city: 'Toronto',
  state: 'CA',
  age: 34,
  landLord: true,
  description: 'Fred wears black'
};
var Jane = {
  friendName: 'Jane'
};
var fredLike = {
  like: 'The Color Black'
};
var fredHouse = {
  title: 'Test house',
  addressOne: 'Test direction',
  addressTwo: '',
  city: 'San Francisco',
  state: 'CA',
  description: 'Blurb',
  price: 1000.00,
  openRooms: 2,
  capacity: 4,
  smoking: false,
  pets: true,
  genderPref: 2
};
var fredWant = {
  city: 'San Francisco',
  state: 'CA',
  smoking: false,
  pets: true,
  minPrice: 0,
  maxPrice: 2000
};
var housePic = {
  housePic: 'photo'
};
describe('Database Schema',function() {
 
  beforeEach(function(done) {
    mysql.createConnection({
      user: 'root',
      password: '',
      database: 'roomly'
    }).then(function(conn) {
      db = conn;
      var queries;
      
      db.query('SET FOREIGN_KEY_CHECKS = 0;')
        .then(function() {
          queries = [
            db.query('TRUNCATE Users;'),
            db.query('TRUNCATE Friends;'),
            db.query('TRUNCATE Houses;'),
            db.query('TRUNCATE Likes;'),
            db.query('TRUNCATE Pics;'),
            db.query('TRUNCATE Wants;')
          ];
          return Promise.all(queries).then(function() {
            return db.query('SET FOREIGN_KEY_CHECKS = 1;')
              .then(function() {
                done();
              })
          });
        });
    });
  });
  
  afterEach(function() {
    db.end()
  });
    
  it('Should add users to the DB', function(done) {
    db.query('INSERT INTO Users SET ?', Fred)
      .then(function(result) {
        expect(result.affectedRows).to.equal(1);
        expect(result.warningCount).to.equal(0);
        done();
      });
    
  });
  it('Should add a House to a User', function(done) {
    
    
    db.query('INSERT INTO Users SET ?', Fred)
      .then(function() {
        return db.query('SELECT id FROM Users WHERE userName = ?', Fred.userName)
          .then(function(results) {
            expect(results[0].id).to.equal(1);
            fredHouse.userId = results[0].id;
            return db.query('INSERT INTO Houses SET ?', fredHouse)
              .then(function() {
                return db.query('SELECT * FROM Houses WHERE userId = ?', fredHouse.userId)
                  .then(function(results) {
                    expect(results[0].userId).to.equal(fredHouse.userId);
                    expect(results[0].title).to.equal(fredHouse.title);
                    done();
                  });
              });
          });
      });
  });
  it('Should add a Want to a User', function(done) {
    
    db.query('INSERT INTO Users SET ?', Fred)
      .then(function() {
        return db.query('SELECT id FROM Users WHERE userName = ?', Fred.userName)
          .then(function(results) {
            expect(results[0].id).to.equal(1);
            fredWant.userId = results[0].id;
            return db.query('INSERT INTO Wants SET ?', fredWant)
              .then(function() {
                return db.query('SELECT * FROM Wants WHERE userId = ?', fredWant.userId)
                  .then(function(results) {
                    expect(results[0].userId).to.equal(fredWant.userId);
                    expect(results[0].city).to.equal(fredWant.city);
                    done();
                  });
              });
          });
      });
  });
  it('Should add a Pic to a House', function(done) {
    
    db.query('INSERT INTO Users SET ?', Fred)
      .then(function() {
        return db.query('SELECT id FROM Users WHERE userName = ?', Fred.userName)
          .then(function(results) {
          fredHouse.userId = results[0].id;
          return db.query('INSERT INTO Houses SET ?', fredHouse)
            .then(function() {
              return db.query('SELECT id FROM Houses WHERE title = ?', fredHouse.title)
                .then(function(results) {
                  expect(results[0].id).to.equal(1);
                  housePic.houseId = results[0].id;
                  return db.query('INSERT INTO Pics SET ?', housePic)
                    .then(function() {
                      return db.query('SELECT * FROM Pics WHERE houseId = ?', housePic.houseId)
                        .then(function(results) {
                          expect(results[0].houseId).to.equal(housePic.houseId);
                          expect(results[0].housePic).to.equal(housePic.housePic);
                          done();
                        });
                    });
                });
            });
          });
      });
  });
  it('Should add a Friend to a User', function(done) {
    
    db.query('INSERT INTO Users SET ?', Fred)
      .then(function() {
        return db.query('SELECT id FROM Users WHERE userName = ?', Fred.userName)
          .then(function(results) {
            Jane.userId = results[0].id;
            return db.query('INSERT INTO Friends SET ?', Jane)
              .then(function() {
                return db.query('SELECT * FROM Friends WHERE userId = ?', Jane.userId)
                  .then(function(results) {
                    expect(results[0].userId).to.equal(Jane.userId);
                    expect(results[0].friendName).to.equal(Jane.friendName);
                    done();
                  });
              });
          });
      });
  });
  it('Should add a Like to a User', function(done) {
    
    db.query('INSERT INTO Users SET ?', Fred)
      .then(function() {
        return db.query('SELECT id FROM Users WHERE userName = ?', Fred.userName)
          .then(function(results) {
            fredLike.userId = results[0].id;
            return db.query('INSERT INTO Likes SET ?', fredLike)
              .then(function() {
                return db.query('SELECT * FROM Likes WHERE userId = ?', fredLike.userId)
                  .then(function(results) {
                    expect(results[0].userId).to.equal(fredLike.userId);
                    expect(results[0].like).to.equal(fredLike.like);
                    done();
                  });
              });
          });
      });
  });
});

describe('Database Models', function() {
  beforeEach(function(done) {
    mysql.createConnection({
      user: 'root',
      password: '',
      database: 'roomly'
    }).then(function(conn) {
      db = conn;
      var queries;
      
      db.query('SET FOREIGN_KEY_CHECKS = 0;')
        .then(function() {
          queries = [
            db.query('TRUNCATE Users;'),
            db.query('TRUNCATE Friends;'),
            db.query('TRUNCATE Houses;'),
            db.query('TRUNCATE Likes;'),
            db.query('TRUNCATE Pics;'),
            db.query('TRUNCATE Wants;')
          ];
          return Promise.all(queries).then(function() {
            return db.query('SET FOREIGN_KEY_CHECKS = 1;')
              .then(function() {
                done();
              })
          });
        });
    });
  });
  
  afterEach(function(done) {
    db.query('SET FOREIGN_KEY_CHECKS = 0;')
      .then(function() {
        queries = [
          db.query('TRUNCATE Users;'),
          db.query('TRUNCATE Friends;'),
          db.query('TRUNCATE Houses;'),
          db.query('TRUNCATE Likes;'),
          db.query('TRUNCATE Pics;'),
          db.query('TRUNCATE Wants;')
        ];
        return Promise.all(queries).then(function() {
          return db.query('SET FOREIGN_KEY_CHECKS = 1;')
            .then(function() {
              db.end();
              done();
            })
        });
      });
 
  });

  it('Should use the model to add a User', function(done) {
    addUser(Fred)
      .then(function() {
        return db.query('SELECT * FROM Users WHERE userNAME = ?', Fred.userName)
          .then(function(result) {
            expect(result[0].userName).to.equal(Fred.userName);
            expect(result[0].city).to.equal(Fred.city);
            done();
          });
      });
  });
  it('Should use the model to add a House', function(done) {
    addUser(Fred)
      .then(function() {
        return addHouse(fredHouse, 1)
          .then(function() {
            return db.query('SELECT * FROM Houses WHERE city = ?', fredHouse.city)
              .then(function(result) {
                expect(result[0].city).to.equal(fredHouse.city);
                expect(result[0].state).to.equal(fredHouse.state);
                done();
              });
          });
      });
    
  });
  it('Should use the model to add a Want', function(done) {
    addUser(Fred)
      .then(function() {
        return addWant(fredWant, 1)
          .then(function() {
            return db.query('SELECT * FROM Wants WHERE city = ?', fredWant.city)
              .then(function(result) {
                expect(result[0].city).to.equal(fredWant.city);
                expect(result[0].state).to.equal(fredWant.state);
                done();
              });
          });
      });
  });
  it('Should use the model to add a Pic', function(done) {
    var houseId;
    addUser(Fred)
      .then(function() {
        return addHouse(fredHouse, 1)
          .then(function() {
            return db.query('SELECT * FROM Houses WHERE city = ?', fredHouse.city)
              .then(function(result) {
                houseId = result[0].id;
                return addPic(housePic, houseId)
                  .then(function() {
                    return db.query('SELECT * FROM Pics WHERE houseId = ?', houseId)
                      .then(function(result) {
                        expect(result[0].housePic).to.equal(housePic.housePic);
                        expect(result[0].houseId).to.equal(houseId);
                        done();
                      });
                  });
              });
          });
      });
  });
  it('Should use the model to add a Friend', function(done) {
    addUser(Fred)
      .then(function() {
        return addFriend(Jane, 1)
          .then(function() {
            return db.query('SELECT * FROM Friends WHERE friendName = ?', Jane.friendName)
              .then(function(result) {
                expect(result[0].friendName).to.equal(Jane.friendName);
                expect(result[0].userId).to.equal(Jane.userId);
                done();
              });
          });
      });
  });
  it('Should use the model to add a Like', function(done) {
    addUser(Fred)
      .then(function() {
        return addLike(fredLike, 1)
          .then(function() {
            return db.query('SELECT * FROM Likes WHERE userId = ?', fredLike.userId)
              .then(function(result) {
                expect(result[0].like).to.equal(fredLike.like);
                done();
              });
          });
      });
  });
  it('Should update a Want', function(done) {
    var wantTwo = {
      city: 'New York',
      state: 'NY',
      smoking: false,
      pets: true,
      minPrice: 0,
      maxPrice: 1500
    };
    addUser(Fred)
      .then(function() {
        return addWant(fredWant, Fred.id)
          .then(function() {
            return addUpdateWant(wantTwo, Fred.id)
              .then(function() {
                return db.query('SELECT * FROM Wants WHERE userID = ?', Fred.id)
                  .then(function(results) {
                    expect(results[0].city).to.equal(wantTwo.city);
                    expect(results[0].state).to.equal(wantTwo.state);
                    expect(results[0].maxPrice).to.equal(wantTwo.maxPrice);
                    done();
                  })
              });
          });
      });
  });
  it('Should update a House', function(done) {
    var houseTwo = {
      title: 'Test house',
      addressOne: 'Test direction',
      addressTwo: '',
      city: 'New York',
      state: 'NY',
      description: 'Howdy',
      price: 2000.00,
      openRooms: 1,
      capacity: 4,
      smoking: false,
      pets: true,
      genderPref: 1
    };
    addUser(Fred)
      .then(function() {
        return addHouse(fredHouse, Fred.id)
          .then(function() {
            return addUpdateHouse(houseTwo, Fred.id)
              .then(function() {
                return db.query('SELECT * FROM Houses WHERE userID = ?', Fred.id)
                  .then(function(results) {
                    expect(results[0].city).to.equal(houseTwo.city);
                    expect(results[0].state).to.equal(houseTwo.state);
                    expect(results[0].openRooms).to.equal(houseTwo.openRooms);
                    done();
                  })
              });
          });
      });
  });
});
