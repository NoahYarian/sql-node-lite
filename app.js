var sqlite3  = require('sqlite3');
var db = new sqlite3.Database('./Northwind.sl3');

db.serialize(function() {

  db.run('', function () {
    console.log('/=========\\');
    console.log('|Categories|');
    console.log('\\=========/');
  });

  getCategories();

  db.run('', function () {
    console.log('/========\\');
    console.log('|Products|');
    console.log('\\========/');
  });

  getProducts();

  db.run('', function () {
    console.log('/====================\\');
    console.log('|Employee Supervisors|');
    console.log('\\====================/');
  });

  getEmployeeSupers();

  db.run('', function () {
    console.log('/===============\\');
    console.log('|createCFTable()|');
    console.log('\\===============/');
  });

  createCFTable();

  db.run('', function () {
    console.log('/==============\\');
    console.log('|insertCFRows()|');
    console.log('\\==============/');
  });

  insertCFRows();

  db.run('', function () {
    console.log('/=====================\\');
    console.log('|queryCFDescriptions()|');
    console.log('\\=====================/');
  });

  queryCFDescriptions();

  db.run('', function () {
    console.log('/==================\\');
    console.log('|updateCFTableRow()|');
    console.log('\\==================/');
  });

  updateCFTableRow();

  db.run('', function () {
    console.log('/=====================\\');
    console.log('|queryCFDescriptions()|');
    console.log('\\=====================/');
  });

  queryCFDescriptions();

  db.run('', function () {
    console.log('/==================\\');
    console.log('|deleteCFTableRow()|');
    console.log('\\==================/');
  });

  deleteCFTableRow();

  db.run('', function () {
    console.log('/==============\\');
    console.log('|insertCFRow2()|');
    console.log('\\==============/');
  });

  insertCFRow2();

  db.run('', function () {
    console.log('/=====================\\');
    console.log('|queryCFDescriptions()|');
    console.log('\\=====================/');
  });

  queryCFDescriptions();

});


function getCategories() {

  db.each('SELECT * FROM Categories', function (err, row) {
    console.log(row.Description.toString());
  });
}

function getProducts() {

  db.each('SELECT * FROM Products ' +
    'INNER JOIN Categories ' +
    'ON Products.CategoryID = Categories.CategoryID ' +
    'LIMIT 10', function (err, row) {
      console.log(row.ProductName + ' is a ' + row.CategoryName);
    });
}

function getEmployeeSupers() {

  db.each(
    'SELECT E.LastName AS Employee, S.LastName AS Supervisor ' +
    'FROM Employees AS E ' +
    'LEFT OUTER JOIN Employees AS S ' +
    'ON E.ReportsTo = S.EmployeeID', function (err, row) {
      if (row.Supervisor === null) {
        console.log(row.Employee + " has no supervisor");
      } else {
        console.log(row.Employee + "'s supervisor is " + row.Supervisor);
      }
    });
}

function createCFTable() {
  db.each(
    'CREATE TABLE IF NOT EXISTS CategoryFavorites(' +
    'FavoriteID INTEGER NOT NULL PRIMARY KEY, ' +
    'CategoryID INTEGER NOT NULL, ' +
    'FOREIGN KEY(CategoryID) REFERENCES Categories(CategoryID));'
    , function(err, row) {
      console.log(err);
    });
}

function insertCFRows() {
  db.each(
    'INSERT INTO CategoryFavorites(CategoryID) VALUES (2),(4),(6),(8);'
    , function(err, row) {
      console.log(err);
    });
}

function queryCFTable() {
  db.each(
    'SELECT * FROM CategoryFavorites;'
    , function(err, row) {
      console.log(row);
    });
}

function queryCFDescriptions() {
  db.each(
    'SELECT CategoryFavorites.FavoriteID, Categories.Description ' +
    'FROM CategoryFavorites ' +
    'INNER JOIN Categories ' +
    'ON Categories.CategoryID = CategoryFavorites.CategoryID;'
    , function(err, row) {
      console.log(row.FavoriteID + ": " + row.Description);
    });
}

function updateCFTableRow() {
  db.each(
    'UPDATE CategoryFavorites SET CategoryID = 5 WHERE CategoryID = 4;'
    , function(err, row) {
      console.log(err);
    });
}

function deleteCFTableRow() {
  db.each(
    'DELETE FROM CategoryFavorites WHERE FavoriteID = 3;'
    , function(err, row) {
      console.log(err);
    });
}

function insertCFRow2() {
  db.each(
    'INSERT INTO CategoryFavorites(CategoryID) VALUES (1);'
    , function(err, row) {
      console.log(err);
    });
}

db.close();
