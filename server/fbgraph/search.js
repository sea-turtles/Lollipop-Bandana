'use strict';
const request = require('request');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const stubData = require('./stubData');

module.exports = {

  search: (app) => {
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }));

    app.post('/api/user', (req, res) => {
      //receive user when they log in or create account
      //has all settings as one call
      //two objects: profile and settings
      var profile = req.body.profile;
      var settings = req.body.settings;

      //combine profile and settings to make one big object
      var user = {
        id: parseInt(profile.identities[0].user_id),
        name: profile.name,
        gender: profile.gender === 'male' ? 0 : 1,
        location: profile.location,
        pic: profile.picture_large,
        likes: profile.context.mutual_likes.data,
        friends: profile.context.mutual_friends.data,
        description: settings.description,
        smoking: settings.smoking,
        pets: settings.pets,
        landlord: settings.landlord,
        priceMin: settings.priceMin ? settings.priceMin : null,
        priceMax: settings.priceMax ? settings.priceMax : null
      };


      // user = {
      //   userId:
      //   want: {
      //     smoking
      //     pets
      //   }
      // }

      // house = {

      // }

      //send to DB -> update or create user
      db.addUser(user);
      db.addHouse(house, userId);

      res.send();
    });

    app.post('/api/search', (req, res) => {
      //take in user id and search settings
      // console.log('post to api/search', req.body);
      // var userId = req.body.userId;
      // var user = req.body.settings;
      // user.userId = userId;
      // description
      // smoking
      // pets
      // priceMin
      // priceMax


      //check against db with db.Search({id, location, smoking, etc})
      //db returns users who have same preferences/location

      // var matches = db.Search(user);

      var matches = req.body.friends; //for testing
      // console.log('back from db', matches);

      //get user info
      // var userInfo = db.userInfo(userId);

      //===========TESTING ONLY================================
      //combine profile and settings to make one big object
      // var fakePeople = stubData.fakePeople;
      // var userInfo = stubData.fakeUserInfo;
      // console.log('userinfo from db', userInfo);

      //advanced refactor
      //matches should be an array of objects
      // matches = [{name: Eric, matches: [{id},{id}]
      matches.map( (match) => {
        return score(likesCheck(userInfo, friendsCheck(userInfo, match)));
      });

      //return data to client
      res.send(matches);
    });

    var friendsCheck = function (userInfo, match) {
      // console.log('friendsCheck');
      var currentUserFriends = userInfo.friends;
      // console.log('currentUserFriends', currentUserFriends);

      //if user is a landlord
      if (true) {
        currentUserFriends.forEach( (userFriend) => {
          match.friends.forEach( (matchFriend) => {
            // console.log('matching', userFriend.id, matchFriend.id)
            if (userFriend.id == matchFriend.id) {
              // console.log('friend match')

              if (!match.mutualFriends) {
                match.mutualFriends = [];
                match.mutualFriendsCounter = 0;
              }
              match.mutualFriends.push(matchFriend);
              match.mutualFriendsCounter++;
              // console.log('mutual friends', match.mutualLikesCounter)
            }
          });
        });

      //if user is a tenant
      } else if (false) {


      }

      return match;
    };

    var likesCheck = function (userInfo, match) {
      // console.log('likesCheck');
      var currentUserLikes = userInfo.likes;

      //if user is a landlord
      if (true) {
        currentUserLikes.forEach( (userLike) => {
          match.likes.forEach( (matchLike) => {
            // console.log('matching', userLike.id, matchLike.id)

            if (userLike.id == matchLike.id) {
              // console.log('likes match')
              if (!match.mutualLikes) {
                match.mutualLikes = [];
                match.mutualLikesCounter = 0;
              }
              match.mutualLikes.push(matchLike);
              match.mutualLikesCounter++;
              // console.log('mutual likes', match.mutualLikesCounter)
            }
          });
        });

      //if user is a tenant
      } else if (false) {

      }

      return match;
    };

    var score = function (match) {
      //should score match for ranking by their mutual friends and likes
      match.score = match.mutualLikesCounter * 5 + match.mutualFriendsCounter * 15 + 0;
      // console.log('score', match.score);

      return match;
    };
  }
//end of app
};