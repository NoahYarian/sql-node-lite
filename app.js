var async = require('async');
var pg = require('pg');

var conString = "postgres://localhost/Northwind";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

  async.series([
    function(callback) {
      console.log('/==========\\');
      console.log('|Categories|');
      console.log('\\==========/');
      client.query('SELECT * FROM Categories;', function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        result.rows.forEach(function(row) {
          console.log(row.Description);
        });
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/========\\');
      console.log('|Products|');
      console.log('\\========/');
      client.query('SELECT * FROM Products ' +
        'INNER JOIN Categories ' +
        'ON Products."CategoryID" = Categories."CategoryID" ' +
        'LIMIT 10;', function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        result.rows.forEach(function(row) {
          console.log(row.ProductName + ' is a ' + row.CategoryName);
        });
        console.log('...');
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/====================\\');
      console.log('|Employee Supervisors|');
      console.log('\\====================/');
      client.query('SELECT E."LastName" AS "Employee", S."LastName" AS "Supervisor" ' +
        'FROM Employees AS E ' +
        'LEFT OUTER JOIN Employees AS S ' +
        'ON E."ReportsTo" = S."EmployeeID"', function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        result.rows.forEach(function(row) {
          if (row.Supervisor === null) {
            console.log(row.Employee + " has no supervisor");
          } else {
            console.log(row.Employee + "'s supervisor is " + row.Supervisor);
          }
        });
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/=============\\');
      console.log('|createCFTable|');
      console.log('\\=============/');
      client.query('CREATE TABLE IF NOT EXISTS CategoryFavorites(' +
        '"FavoriteID" SERIAL NOT NULL PRIMARY KEY, ' +
        '"CategoryID" INTEGER NOT NULL, ' +
        'FOREIGN KEY("CategoryID") REFERENCES Categories("CategoryID"));', function(err, result) {
        if(err) {
          return console.error('error creating table:', err);
        }
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/============\\');
      console.log('|insertCFRows|');
      console.log('\\============/');
      client.query('INSERT INTO CategoryFavorites("CategoryID") VALUES (2),(4),(6),(8);', function(err, result) {
        if(err) {
          return console.error('error inserting rows:', err);
        }
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/===================\\');
      console.log('|queryCFDescriptions|');
      console.log('\\===================/');
      client.query('SELECT CategoryFavorites."FavoriteID", Categories."Description" ' +
        'FROM CategoryFavorites ' +
        'INNER JOIN Categories ' +
        'ON Categories."CategoryID" = CategoryFavorites."CategoryID";', function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        result.rows.forEach(function(row) {
          console.log(row.FavoriteID + ": " + row.Description);
        });
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/================\\');
      console.log('|updateCFTableRow|');
      console.log('\\================/');
      client.query('UPDATE CategoryFavorites SET "CategoryID" = 5 WHERE "CategoryID" = 4;', function(err, result) {
        if(err) {
          return console.error('error updating table:', err);
        }
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/===================\\');
      console.log('|queryCFDescriptions|');
      console.log('\\===================/');
      client.query('SELECT CategoryFavorites."FavoriteID", Categories."Description" ' +
        'FROM CategoryFavorites ' +
        'INNER JOIN Categories ' +
        'ON Categories."CategoryID" = CategoryFavorites."CategoryID";', function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        result.rows.forEach(function(row) {
          console.log(row.FavoriteID + ": " + row.Description);
        });
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/================\\');
      console.log('|deleteCFTableRow|');
      console.log('\\================/');
      client.query('DELETE FROM CategoryFavorites WHERE "FavoriteID" = 3;', function(err, result) {
        if(err) {
          return console.error('error deleting row:', err);
        }
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/============\\');
      console.log('|insertCFRow2|');
      console.log('\\============/');
      client.query('INSERT INTO CategoryFavorites("CategoryID") VALUES (1);', function(err, result) {
        if(err) {
          return console.error('error inserting another row:', err);
        }
        callback(null, null);
      });
    },
    function(callback) {
      console.log('/===================\\');
      console.log('|queryCFDescriptions|');
      console.log('\\===================/');
      client.query('SELECT CategoryFavorites."FavoriteID", Categories."Description" ' +
        'FROM CategoryFavorites ' +
        'INNER JOIN Categories ' +
        'ON Categories."CategoryID" = CategoryFavorites."CategoryID";', function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        result.rows.forEach(function(row) {
          console.log(row.FavoriteID + ": " + row.Description);
        });
        callback(null, null);
      });
    },
    function() {
      client.end();
    }
  ]);

});
