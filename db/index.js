'use strict';

const mysql = require('promise-mysql');

const host = '127.0.0.1';

let connection;

mysql.createConnection({
  host: host,
  user: 'root',
  database: 'roomly',
  password: ''
}).then(function(conn) {
  connection = conn;
  module.exports.connection = connection;
});
