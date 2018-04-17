// var sqlite3 = require('sqlite3').verbose();

// // var db = new sqlite3.Database('BarbersDB');
// // db.serialize(function() {
// //   db.run("CREATE TABLE barbers (id INTEGER PRIMARY KEY, placeId TEXT, gvanim INTEGER, menHaircut INTEGER, name INTEGER)");
 
// //   var intoBarbers = db.prepare("INSERT INTO barbers VALUES (?, ?, ?, ?, ?)");
// //   intoBarbers.run(1, "placeId" + 1, 100 + 1 * 10, 1000, "Barber " + 1);
// //   for (var i = 2; i <= 10; i++) {
// //       intoBarbers.run(i, "placeId" + i, 100 + i * 10, i * 10, "Barber " + i);
// //   }

// //   intoBarbers.finalize();
// //   });

// var http = require('http');
// http.createServer(function (req, res) {
// 	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
// 	var db = new sqlite3.Database('BarbersDB');
// 	var a = [];
// 	db.all("SELECT id, placeId, gvanim, menHaircut, name FROM barbers", function(err, rows) {
// 	  rows.forEach((row) => {
// 	  	a.push({id: row.id, placeId: row.placeId, gvanim: row.gvanim, menHaircut: row.menHaircut, name: row.name});
// 	  });
// 	  res.write(JSON.stringify(a));
//       res.end();
// 	});
// 	db.close();
// }).listen(8080, () => console.log("running on 8080"));






// var sqlite3 = require('sqlite3').verbose();

// var db = new sqlite3.Database('BarbersDB');
// db.serialize(function() {
//   db.run("CREATE TABLE barbers (id INTEGER PRIMARY KEY, address TEXT, gvanim INTEGER, menHaircut INTEGER, name INTEGER)");
//   db.run("CREATE TABLE locations (barber INTEGER REFERENCES barbers(id), latitude DOUBLE, longitude DOUBLE)");
 
//   var intoBarbers = db.prepare("INSERT INTO barbers VALUES (?, ?, ?, ?, ?)");
//   var intoLocations = db.prepare("INSERT INTO locations VALUES (?, ?, ?)");
//       intoBarbers.run(1, "בן גוריון 24, פתח תקווה", 100 + 1 * 10, 50, "יוסף");
//       intoLocations.run(1, 32.0790541, 34.870013);
//       intoBarbers.run(2, "כתובת 2", 100 + 1 * 20, 70, "דני");
//       intoLocations.run(2, 32.0790531, 34.870023);
//   for (var i = 3; i <= 10; i++) {
//       intoBarbers.run(i, "address " + i, 100 + i * 10, i * 10, "Barber " + i);
//       intoLocations.run(i, i * 10, 10 + i * 10);
//   }

//   intoBarbers.finalize();
//   intoLocations.finalize();

//   db.run("ALTER TABLE barbers ADD fen INTEGER");
//   db.run("UPDATE barbers SET fen = -1");
//   });

var sqlite3 = require('sqlite3').verbose();//
var url = require('url');
var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
	var query = url.parse(req.url, true).query;
	// checkVersion(query);
	var db = new sqlite3.Database('BarbersDB');
	var a = [];
	db.all("SELECT bs.address, bs.gvanim, bs.menHaircut, bs.fen, bs.name, loc.latitude, loc.longitude\
		    FROM barbers as bs\
		    JOIN locations as loc\
		    ON bs.id = loc.barber", function(err, rows) {
	  rows.forEach((row) => {
	  	if (getDistance(row.latitude, query.latitude, row.longitude, query.longitude) / 1000 < 15)
	  		a.push({address: row.address, gvanim: row.gvanim, menHaircut: row.menHaircut, fen: row.fen,
	  				name: row.name, location: {latitude: row.latitude, longitude: row.longitude}});
	  });
	  res.write(JSON.stringify(a));
      res.end();
	});
	db.close();
}).listen(8080, () => console.log("running on 8080"));

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