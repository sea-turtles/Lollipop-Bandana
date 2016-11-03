exports.fakePeople = [
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

exports.fakeUserInfo = {
  id: '111948542155151',
  name: 'Eric Eakin',
  gender: 'male',
  location: 'San Francisco',
  pic: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c9.0.50.50/' +
  'p50x50/13428645_10105401440955833_9212030742952603035_n.jpg?oh=ffc9408bf179bab7d7ebb1e7b1804f04&oe=5892DCB5',
  friends: [exports.fakePeople[1], exports.fakePeople[2], exports.fakePeople[3],
exports.fakePeople[4], exports.fakePeople[5], exports.fakePeople[6], exports.fakePeople[7]],
  likes: [exports.fakePeople[2], exports.fakePeople[3], exports.fakePeople[4],
exports.fakePeople[6], exports.fakePeople[9], exports.fakePeople[11], exports.fakePeople[13]]
};


exports.fakeFriends = [
  {name: 'Eric', friends: this.f1, likes: this.l1},
  {name: 'Eugene', friends: this.f2, likes: this.l2},
  {name: 'Gilles', friends: this.f3, likes: this.l3},
  {name: 'JP', friends: this.f4, likes: this.l4}
];