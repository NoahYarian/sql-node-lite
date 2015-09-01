var sqlite3  = require('sqlite3');
var db = new sqlite3.Database('./Northwind.sl3');

db.each('SELECT * FROM Categories', function (err, row) {
  console.log(row);
});

db.close();
