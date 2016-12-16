User clicks log in -->
client sends user id, profile and settings

  res.body.profile
    id
    name
    location
      name (city, state)
    picture
      data
        url


  res.body.settings
    description
    smoking
    pets
    genderPref (null if landlord)
    priceMin (null if landlord)
    priceMax (null if landlord)
    house
      id
      title
      housePics
      genderPref
      city
      state
      description
      price
      smoking
      pets

server receives
  sends to database


=====================================


User clicks search button -->
client sends user id and search terms

server receives
  sends to database
    id
    city
    state
    smoking
    pets
    priceMin
    priceMax

database receives
  finds all users who
    have opposite landlord setting
    house location matches user location
    house price is between priceMin and priceMax
    house smokes matches user smokes
    house pets matches user pets

  returns data for tenants:

  array of houses with landlord property

    house
      id
      title
      housePics
      city
      state
      description
      price
      smoking
      pets
      landlord
        id
        name
        pic
        age
        description
        friends
        likes

  returns data for landlords:

  array of users:

    user
      id
      name
      pic
      age
      description
      friends
      likes

server processes data to find best match and creates a score (higher is better match)
  sends to client a list where each user element is an object that has:
    id
    score (sort by score for matching)
    pic
    description
    age
    mutualFriends (array of objects)
      name
      pic
    mutualLikes (array of objects)
      name
      pic
    house (object or null)
      id
      title
      pics
      location
      description
      price
      smokes
      pets

id = profile.identities[0].user_id
name = profile.name
gender = profile.gender
location = profile.location
age = profile.
pic = profile.picture
likes: profile.context.mutual_likes.data
friends on the app = profile.context.mutual_friends.data

{
  "name": "Gilles Bouvier",
  "given_name": "Gilles",
  "family_name": "Bouvier",
  "gender": "male",
  "picture": "https://scontent.xx.fbcdn.net",
  "picture_large": "https://scontent.xx.fbcdn.net/v/t1.0-1/",
  "birthday": "...",
  "context": {
    "mutual_friends": {
      "data": [
        {
          "name": "Eric Eakin",
          "id": "10105894258670183"
        },
        {
          "name": "Eugene Choe",
          "id": "10105524938630499"
        }
      ],
      "paging": {
        "cursors": {
          "before": "MTAxMDU4OTQyNTg2NzAxODMZD",
          "after": "MTAxMDU1MjQ5Mzg2MzA0OTkZD"
        }
      },
      "summary": {
        "total_count": 919
      }
    },
    "mutual_likes": {
      "data": [
        {
          "name": "Alice Mei",
          "id": "181750838946077"
        },
        {
          "name": "The National Jazz Museum in Harlem",
          "id": "249334778411571"
        },
      ],
      "paging": {
        "cursors": {
          "before": "MTgxNzUwODM4OTQ2MDc3",
          "after": "OTc4MzAzMzU0NTYZD"
        },
        "next": "https://graph.facebook.com/v2.8/dXNlcl9jb250ZAXh0OgGQ7b6NLFm48z0RcseXRYaKWwcw0OGuGkZCw7PBSj9ktJa86TwT072zId0JszEEX8ZAl85cxHffZBCyyzqiHlKPbDZBul4ZB3DwSJvlmrx1zDbuFRpoZD/mutual_likes?access_token=EAACZCIRjpCwEBAHxw0u1JaOxJJuimsdqNvyTvwn4mkaAbyU4KZCUSJivtklzX0wUNhZBIu8aW9EatPSydqxz417yvfJ3zkR2pQYoMfzeavOmvW9c4UjnHwiYCaYU4R1Gb7scO1NG4MULEtW3p0N1ZC5PMkTpSeAj425XZBedEZAyeqn5IZA79SEtZBLeTEPokNwHFuSfuQDYpwZDZD&limit=25&after=OTc4MzAzMzU0NTYZD"
      },
      "summary": {
        "total_count": 100
      }
    },
    "id": "dXNlcl9jb250ZAXh0OgGQOMOHw48jF3X1mAPaNS8tlQ6rmBjxvqWCwP70FLGMIZB8CkeZCZCDBESYnYXEQe2kbMUcnkFOa18gPUmW9KZCxum0CpLIK0CyVvHUcZCaGGydHvEQZD"
  },
  "identities": [
    {
      "provider": "facebook",
      "user_id": "1103984516389431",
      "connection": "facebook",
      "isSocial": true
    }
  ],
}