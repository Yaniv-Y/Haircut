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
  	myLoop(con);
}

function f(con)
{
  	var a = [];
	var sql = "SELECT * FROM Barbers.`Table`;"
	con.query(sql, function (err, result, fields) {
	  if (err) throw err;
	  console.log("Table created");
	  result.forEach((row) => {
	  		a.push({address: row.address, gvanim: row.shades, menHaircut: row.menHaircut, fen: row.fen,
	  				name: row.name, location: {latitude: row.latitude, longitude: row.longitude}});
	  });
	  console.log(a[0].address);
	});
}

var i = 1;                     //  set your counter to 1

function myLoop (con) {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      f(con);          //  your code here
      i++;                     //  increment the counter
      if (i < 999999999) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 0)
}

myLoop();                      //  start the loop