var expect = require('chai').expect;
var request = require('request');
var mysql = require('promise-mysql');
var app = require('../../server/main.js');
var fbToDb = require('../../db/controllers/Users.js').fbToDb;

var jpFb = { name: 'J.p. Zivalich',
  given_name: 'J.p.',
  family_name: 'Zivalich',
  gender: 'male',
  picture: 'testpic',
  picture_large: 'largetestpic',
  age_range: { min: 21  },
      birthday: '01/01/1990',
      context:
       { mutual_friends: [Object],
              mutual_likes: [Object],
              id: 'randomstuff'  },
      cover:
       { id: 'randomstuff',
              offset_y: 40,
              source: 'testsource'  },
      favorite_teams: [ [Object], [Object]  ],
      installed: true,
      location: { id: '111111', name: 'San Francisco, California'  },
      name_format: '{first} {last}',
      timezone: -7,
      clientID: 'dummydummy',
      user_id: 'facebook|12345',
      global_client_id: 'dummyid'  }; 


describe('Server', function() {
  var postOptions = {
    method: 'POST',
    followAllRedirects: true,
    uri: 'http://localhost:3000/api/user',
    json: {
      profile: jpFb
    }
  };
  it('Should post a user', function(done) {
    request(postOptions, function(error, res, body) {
      console.log('Whats in a name?', body.profile.name);
      expect(body.profile.name).to.equal(jpFb.name);
      done();
    });
  });
  it('Should take a facebook profile and format it for the db', function() {
    var jpUser = {
      id: 12345,
      userName: 'J.p. Zivalich',
      profPic: 'largetestpic',
      city: 'San Francisco',
      state: 'CA',
      age: 26,
      landLord: null,
      description: null,
      gender: 0 
    };
    var jpTwo = {
      id: 12345,
      userName: 'J.p. Zivalich',
      profPic: 'largetestpic',
      city: 'San Francisco',
      state: 'CA',
      age: 26,
      landLord: true,
      description: 'll desc',
      gender: 0 
    };
    var testSet = {
      landlord: true,
      landlordData: {
        id: 123456,
        name: 'whatever',
        description: 'll desc',
        title: 'Dope house',
        city: 'Atlanta',
        state: 'GA',
        price: 2000,
        smoking: false,
        pets: true
      },
      tenantData: {
        smoker: false,
        pets: true,
        minSlider: 1500,
        maxSlider: 2500
      }
    };
    var resultUser = fbToDb(jpFb);
    expect(resultUser[0]).to.eql(jpUser);
    resultUser = fbToDb(jpFb, testSet);
    expect(resultUser[0]).to.eql(jpTwo);
  });
  it('Should post a want');
  it('Should post a house');
});
