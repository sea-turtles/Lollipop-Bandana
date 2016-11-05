'use strict';
const abbrState = require('../helpers/helpers.js').abbrState; 

const fbToDb = function(profile, settings) {
  settings = settings || 
    {
      landlord: null,
      tenantData: {
        id: null,
        minSlider: null,
        maxSlider: null,
        smoker: null,
        gender: null,
        pets: null,
        description: null
      },
      landlordData: {
        id: null,
        name: null,
        description: null,
        title: null,
        city: null,
        state: null,
        price: null,
        smoking: null,
        pets: null
      }
    };
  let landLord = settings.landlord;
  let userDescription = null;

  if (landLord !== null && landLord === true) {
    userDescription = settings.landlordData.description;
  } else if (landLord !== null && landLord === false) {
    userDescription = settings.tenantData.description;
  }

  let userLocation = profile.location.name.split(', ');
  let userCity = userLocation[0];
  let userState = abbrState(userLocation[1], 'abbr');
  let userLikes = profile.context.mutual_likes.data;
  let userFriends = profile.context.mutual_friends.data;
  // This isn't a perfect age function. Fix it later
  let userAge = new Date().getFullYear() - new Date(profile.birthday).getFullYear();
  let userIdArray = profile.user_id.split('|');
  //combine profile and settings to make one big object
  let user = {
    id: parseInt(userIdArray[1]),
    userName: profile.name,
    gender: profile.gender === 'male' ? 0 : 1,
    // Figure out location to city/state
    city: userCity,
    state: userState,
    age: userAge,
    profPic: profile.picture_large,
    description: userDescription,
    //smoking: settings.smoking,
    //pets: settings.pets,
    landLord: settings.landlord,
    //minPrice: settings.priceMin ? settings.priceMin : null,
    //maxPrice: settings.priceMax ? settings.priceMax : null
  };

  let house = {
    title: settings.landlordData.title,
    addressOne: null,
    addressTwo: null,
    city: settings.landlordData.city,
    state: settings.landlordData.state,
    description: settings.landlordData.description,
    price: settings.landlordData.price,
    openRooms: null,
    capacity: null,
    smoking: settings.landlordData.smoking,
    pets: settings.landlordData.pets,
    genderPref: null
  };

  let want = {
    city: null,
    state: null,
    smoking: settings.tenantData.smoker,
    pets: settings.tenantData.pets,
    minPrice: settings.tenantData.minSlider,
    maxPrice: settings.tenantData.maxSlider
  };

  if (settings.landlord === null) {
    return [user];
  }

  if (settings.landlord === true) {
    return [user, house]
  }

  if (settings.landlord === false) {
    return [user, want];
  }

};

module.exports.fbToDb = fbToDb;
