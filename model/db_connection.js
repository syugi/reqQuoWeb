var mysql = require('sync-mysql');

var con = new mysql({
	host : "localhost",
	user : "root",
	password : "newyear",
	database : "new_year"
});

module.exports = con;