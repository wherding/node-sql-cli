var mysql = require("mysql");
var m1 = process.argv[2];//.slice(2).toString();
var m2 = process.argv[3];//.slice(2).toString();
var m3 = process.argv[4];//.slice(2).toString();
var managerCommand = [m1, m2,m3].join(" ");



var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "dude",
  database: "bamazon"
});

console.log( managerCommand);

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  if (managerCommand === "View Products for Sale"){
    selectAll();
    };
    if (managerCommand === "View Low Inventory"){
      selectLowQ();
      };

      if (managerCommand === "Add New Product"){
        
        addProduct();
        };
      
  });


//View Products for Sale
function selectAll() {

  let readQuery = "SELECT * FROM products";

  connection.query(readQuery, function (err, results) {
    if (err) throw err;
    console.log(results);

    connection.end();

  })
}

//View Low Inventory

function selectLowQ() {

  let readQuery = "SELECT * FROM products WHERE stock_quantity < 10";

  connection.query(readQuery, function (err, results) {
    if (err) throw err;
    console.log(results);

    connection.end();

  })
}

// Add New Product

var productName = process.argv[5];
var departmentName = process.argv[6];
var price = process.argv[7];
var stock = process.argv[8];


function addProduct() {
    console.log("Inserting to DB");
   // connection.end();
//return;
    connection.query("INSERT INTO products SET ?", {
        product_name: productName,
        department_name: departmentName,
        price: price,
        stock_quantity: stock
    }, function (error, results) {
        if (error) throw error;
        
        connection.end();
        return;

    });
    // connection.end();
}