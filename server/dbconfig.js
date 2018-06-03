var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: "3306"
});

const db = 'filmsdb';
const table = 'films';

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to server!");
  con.query(`CREATE DATABASE ${db}`, function (err, result) {
    if (err) throw err;
    console.log(`Database ${db} created`);
  });
});

var connnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: "3306",
  database: db
});

connnection.connect(function(err) {
  if (err) throw err;
  console.log(`Connected to ${db}!`);
  var sql = `CREATE TABLE ${table} (id CHAR(255), title VARCHAR(255), release_year VARCHAR(255), radio VARCHAR(255), stars TEXT)`;
  connnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`Table ${table} created`);
  });
  connnection.end(function(err) {

  })
});