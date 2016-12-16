'use strict';
const request = require('request');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = {

  search: (app) => {
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }));

    app.post('/api/user', (req, res) => {
      //receive user when they log in or create account
      //send to DB -> update or create user
    });

    app.post('/api/search', (req, response) => {
      //take in user id and search terms
      //check against db

      console.log('post received to api/search');

      var token = req.headers.token;
      // var url = 'https://graph.facebook.com/v2.8/me?access_token=' + token;
      var options = {
        url: 'https://roomly.auth0.com/userinfo',
        Authorization: 'OAuth ' + token
        // url: 'https://graph.facebook.com/v2.8/me',
        // Authorization: 'OAuth ' + token
      };
      // console.log('post', req.body);

      var friends = req.body.friends;
      var profile = req.body.profile;

      var results = dbSearch(friends);

      response.send(results);
    });

    var dbSearch = function(friends) {
      //pretending Eric is running the call right now
      //friends should be an object with users: friendsArray of objects
      var currentUserFriends = friends.Eric;
      console.log('currentUserFriends', currentUserFriends);
      var users = friends;
      var matches = [];

      for (var user in users) {
        var match = {};



      }


      for (var user in users) {
        console.log('looking at', user);
        var match = {};

        currentUserFriends.forEach((friend, i) => {
          console.log('currentUserFriends', friend);
          users[user].forEach((ele, i) => {
            if (friend.name === ele.name) {
              if (!match[user]) {
                match[user] = [];
              }
              match[user].push(friend);

              console.log('found a mutualFriends', friend);
            }
          });
        });

        matches.push(match);

      }

      return matches;
    };
  }
};




==========================


import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import AuthService from '../../../../auth0/utils/AuthService';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import './DashboardView.scss';

class DashboardView extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  constructor(props) {
    super(props);
    this.fakePeople = [
      { name: 'Abraham Lincoln', id: 1, pic: 'src/static/fakeData/profilePics/abraham.jpg' },
      { name: 'Thomas Jefferson', id: 2, pic: 'src/static/fakeData/profilePics/thomasjefferson.jpg' },
      { name: 'Benjamin Franklin', id: 3, pic: 'src/static/fakeData/profilePics/benfranklin.jpg' },
      { name: 'Daft Punk', id: 4, pic: 'src/static/fakeData/profilePics/daftpunk.jpg' },
      { name: 'Bob Ross', id: 5, pic: 'src/static/fakeData/profilePics/bobross.jpg' },
      { name: 'Kid Cudi', id: 6, pic: 'src/static/fakeData/profilePics/kidcudi.jpg' },
      { name: 'Cate Blanchett', id: 7, pic: 'src/static/fakeData/profilePics/cateblanchett.jpg' },
      { name: 'Gary Oldman', id: 8, pic: 'src/static/fakeData/profilePics/garyoldman.jpg' },
      { name: 'Huckleberry Finn', id: 9, pic: 'src/static/fakeData/profilePics/huckfinn.jpg' },
      { name: 'Jennifer Lawrence', id: 10, pic: 'src/static/fakeData/profilePics/jenniferlawrence.jpg' },
      { name: 'Judy Dench', id: 11, pic: 'src/static/fakeData/profilePics/judydench.jpg' },
      { name: 'Vladmir Putin', id: 12, pic: 'src/static/fakeData/profilePics/putin.jpg' },
      { name: 'Ryan Gosling', id: 13, pic: 'src/static/fakeData/profilePics/ryangosling.jpg' },
      { name: 'Scarlett Johansson', id: 14, pic: 'src/static/fakeData/profilePics/scarjo.jpg' },
      { name: 'Tom Sawyer', id: 15, pic: 'src/static/fakeData/profilePics/tomsawyer.jpg' },
    ];

    this.f1 = [this.fakePeople[0], this.fakePeople[3], this.fakePeople[5],
      this.fakePeople[9], this.fakePeople[11], this.fakePeople[12], this.fakePeople[1]];
    this.f2 = [this.fakePeople[0], this.fakePeople[2], this.fakePeople[5],
      this.fakePeople[8], this.fakePeople[13], this.fakePeople[15], this.fakePeople[10]];
    this.f3 = [this.fakePeople[3], this.fakePeople[9], this.fakePeople[2],
      this.fakePeople[15], this.fakePeople[4], this.fakePeople[1], this.fakePeople[14]];
    this.f4 = [this.fakePeople[6], this.fakePeople[7], this.fakePeople[4],
      this.fakePeople[0], this.fakePeople[14], this.fakePeople[8], this.fakePeople[1]];

    this.l1 = [this.fakePeople[3], this.fakePeople[9], this.fakePeople[2],
      this.fakePeople[15], this.fakePeople[4], this.fakePeople[1], this.fakePeople[14]];
    this.l2 = [this.fakePeople[0], this.fakePeople[2], this.fakePeople[5],
      this.fakePeople[8], this.fakePeople[13], this.fakePeople[15], this.fakePeople[10]];
    this.l3 = [this.fakePeople[6], this.fakePeople[7], this.fakePeople[4],
      this.fakePeople[0], this.fakePeople[14], this.fakePeople[8], this.fakePeople[1]];
    this.l4 = [this.fakePeople[0], this.fakePeople[3], this.fakePeople[5],
      this.fakePeople[9], this.fakePeople[11], this.fakePeople[12], this.fakePeople[1]];

    this.fakeFriends = [
      {name: 'Eric', friends: this.f1, likes: this.l1},
      {name: 'Eugene', friends: this.f2, likes: this.l2},
      {name: 'Gilles', friends: this.f3, likes: this.l3},
      {name: 'JP', friends: this.f4, likes: this.l4}
    ];

  }

  componentDidMount() {
  }

  test() {
    const { auth } = this.props.routes[0];
    var token = auth.getToken();
    var profile = auth.getProfile();
    var headers = { token: token };
    console.log( 'ready!', this.fakeFriends );

    $.ajax({
      method: 'POST',
      url: '/api/search',
      headers: headers,
      data: { profile: profile, friends: this.fakeFriends }
    })
    .done(function( msg ) {
      console.log( 'Data Saved: ', msg );
      // $('.test').text(JSON.stringify(msg));
      msg.forEach((user) => {
        $('.test').append('<div>' + user.mutualFriendsCounter + ', ' + user.score + '</div>');
      });
    });
  }

  render() {
    const { auth } = this.props.routes[0];
    const style = { margin: 12 };
    return (
      <div className=''>
        <h2>Logout</h2>
        <RaisedButton
          label='TEST'
          primary={true}
          style={style}
          className='muidocs-icon-action-home'
          onClick={this.test.bind(this)}
        />
        <RaisedButton
           label='FB Logout'
           primary={true}
           style={style}
           className='muidocs-icon-action-home'
           onClick={auth.logout.bind(this)}
         />
      <div className='test'></div>
      </div>
    );
  }

}

export default DashboardView;
