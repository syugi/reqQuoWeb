const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "HKNS" //testDB 
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = db;
