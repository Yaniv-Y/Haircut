// var sqlite3 = require('sqlite3').verbose();
const express = require('express')
const app = express()

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Barbers"
});

con.connect(function(err) {
  	if (err) throw err;
  	console.log("Connected!");
  	var a = [];
	var sql = "SELECT * FROM Barbers.`Table`;"
  	con.query(sql, function (err, result, fields) {
  	  if (err) throw err;
  	  console.log("Table created");
  	  result.forEach((row) => {
	  	if (getDistance(row.latitude, query.latitude, row.longitude, query.longitude) / 1000 < 15)
	  		a.push({address: row.address, gvanim: row.shades, menHaircut: row.menHaircut, fen: row.fen,
	  				name: row.name, location: {latitude: row.latitude, longitude: row.longitude}});
	  });
	  // res.write(JSON.stringify(a));
   //    res.end();
  	});
});

// app.get('/', (req, res) => {
// 	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
// 	var query = req.query
// 	// checkVersion(query);
// })
// app.listen(8080, () => console.log('Server running on port 8080'))

var checkVersion = function(query) {
	if (query.v === "1.0") {
	  res.write("Please Update");
      res.end();
      return;
	}
};

var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1lat, p2lat, p1long, p2long) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2lat - p1lat);
  var dLong = rad(p2long - p1long);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};