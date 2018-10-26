var mysql = require("mysql");
var inquirer = require('inquirer');

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

connection.connect(function(err) {
 if (err) throw err;
// console.log("connected as id " + connection.threadId + "\n");
 //selectAll();
// checkSupply();
});

function selectAll() {

 console.log("reading from db");

 let readQuery = "SELECT * FROM products";

 connection.query(readQuery, function (err, results) {
     if (err) throw err;
     console.log(results);

     connection.end();

 })


}


function start() {
    inquirer
      .prompt([{
        name: "firstQuestion",
        type: "input",
        message: "enter the ID of the item you would like to buy.",
      },
      {
          name: 'howMany',
          type: 'input',
          message: "How many would you like?"
      }]
    )
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
     //console.log(answer.firstQuestion)
    // console.log(answer.howMany)
     checkSupply(answer.firstQuestion,answer.howMany)
      });
   }
   start();

function checkSupply(id,num){

   // console.log("reading from db");

    let readQuery = "select stock_quantity from products where item_id = " + id ;
   
    connection.query(readQuery, function (err, results) {
        if (err) throw err;
       // console.log(results[0].stock_quantity);
       let request = parseInt(num);
        if (request>results[0].stock_quantity) {
            console.log("Insufficient quantity!")
        }
        else{
            sale(request,results[0].stock_quantity, id );
            cost(request,id);
        }
   
        connection.end();
   
    });
   }

   function sale(int, stock, id){
    let newAmout = stock - int;
  //  let readQuery = "select stock_quantity from products where item_id = " + id ;
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: newAmout
    }, {
        item_id: id
    }], function (err, results) {
        if (err) throw err;
       // connection.end();

    });
   
   }

   function cost(int, id){
       
    let readQuery = "select price from products where item_id = " + id ;

    connection.query(readQuery, function (err, results) {
        if (err) throw err;
      let price = int * results[0].price;
        console.log("your total is: " + price)
   
   
    });
    
   // connection.end();
   }