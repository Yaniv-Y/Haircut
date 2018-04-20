var sqlite3 = require('sqlite3').verbose();

function f()
{
var db = new sqlite3.Database('BarbersDB');
var a = [];
db.all("SELECT bs.address, bs.gvanim, bs.menHaircut, bs.fen, bs.name, loc.latitude, loc.longitude\
	    FROM barbers as bs\
	    JOIN locations as loc\
	    ON bs.id = loc.barber", function(err, rows) {
  rows.forEach((row) => {
  	a.push({address: row.address, gvanim: row.gvanim, menHaircut: row.menHaircut, fen: row.fen,
  			name: row.name, location: {latitude: row.latitude, longitude: row.longitude}});
  });
  console.log(a[0].address);
});
db.close();
}

var i = 1;                     //  set your counter to 1

function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      f();          //  your code here
      i++;                     //  increment the counter
      if (i < 999999999) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another 
      }                        //  ..  setTimeout()
   }, 0)
}

myLoop();                      //  start the loop