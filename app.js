var sqlite3  = require('sqlite3');
var db = new sqlite3.Database('./Northwind.sl3');

getCategories(getProducts);

function getCategories(cb) {
  console.log('/=========\\');
  console.log('|Catgories|');
  console.log('\\=========/');

  db.each('SELECT * FROM Categories', function (err, row) {
    console.log(row.Description.toString());
  }, cb);
}

function getProducts() {
  console.log('/========\\');
  console.log('|Products|');
  console.log('\\========/');

  db.each('SELECT * FROM Products ' +
    'INNER JOIN Categories ' +
    'ON Products.CategoryID = Categories.CategoryID ' +
    'LIMIT 10', function (err, row) {
      console.log(row.ProductName + ' is a ' + row.CategoryName);
    }, getEmployeeSupers);
}

function getEmployeeSupers() {
  console.log('/====================\\');
  console.log('|Employee Supervisors|');
  console.log('\\====================/');

  db.each('SELECT F.LastName AS "Employee", S.LastName AS "Supervisor" ' +
    'FROM Employees F ' +
    'INNER JOIN Employees S ' +
    'ON F.ReportsTo = S.EmployeeID', function (err, row) {
      console.log(row.Employee + "'s supervisor is " + row.Supervisor);
    });
}

db.close();
