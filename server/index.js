var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");
var cors = require('cors')
var app = express();

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));

const db = 'filmsdb';
const table = 'films'; 

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: "3306",
  database: db
});
con.connect(function(err) {
  if (err) throw err;
  console.log(`Connected to ${db}!`);
});

app.get('/', function (req, res) {
  con.query(`SELECT * FROM ${table}`, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/', function(req, res) {
  if(req.body.update) {
    con.query(`TRUNCATE TABLE ${table}`, function (err, result, fields) {
      if (err) throw err;
    });
    req.body.films.forEach(elem => {
      var sql = `INSERT INTO ${table} VALUES (${elem.id}, "${elem.title}", "${elem.release}", "${elem.radio}", "${elem.stars}")`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`film with id ${elem.id} has been added to db!`);
      });
    }); 
    res.send();
  } else {
    var sql = `INSERT INTO ${table} VALUES (${req.body.film.id}, "${req.body.film.title}", "${req.body.film.release}", "${req.body.film.radio}", "${req.body.film.stars}")`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`film with id ${req.body.film.id} has been added to db!`);
    });
    res.send();
  }
});

app.listen(3001, function () {
  console.log('Server started on port 3001!');
});