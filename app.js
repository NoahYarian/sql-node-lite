var sqlite3  = require('sqlite3');
var db = new sqlite3.Database('./Northwind.sl3');

db.serialize(function() {

  db.run('', function () {
    console.log('/=========\\');
    console.log('|Catgories|');
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
});

// getEmployeeSupers();


function getCategories() {
  // console.log('/=========\\');
  // console.log('|Catgories|');
  // console.log('\\=========/');

  db.each('SELECT * FROM Categories', function (err, row) {
    console.log(row.Description.toString());
  });
}

function getProducts() {
  // console.log('/========\\');
  // console.log('|Products|');
  // console.log('\\========/');

  db.each('SELECT * FROM Products ' +
    'INNER JOIN Categories ' +
    'ON Products.CategoryID = Categories.CategoryID ' +
    'LIMIT 10', function (err, row) {
      console.log(row.ProductName + ' is a ' + row.CategoryName);
    });
}

function getEmployeeSupers() {
  // console.log('/====================\\');
  // console.log('|Employee Supervisors|');
  // console.log('\\====================/');

  db.each('SELECT E.LastName AS Employee, S.LastName AS Supervisor ' +
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

db.close();
