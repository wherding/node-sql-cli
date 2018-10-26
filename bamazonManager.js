var mysql      = require('mysql');
var inquirer = require('inquirer');
//var table = require('table')


//output = table(data)

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dude',
  database : 'bamazon'
});
 
function viewAll(){
    config = {
        columns: {
            0: {
                alignment: 'left',
                minWidth: 10
            },
            1: {
                alignment: 'center',
                minWidth: 10
            },
            2: {
                alignment: 'right',
                minWidth: 10
            }
        }
    };

connection.connect();
connection.query('SELECT * from products', function (error, results, fields) {
  if (error) throw error;
  //results.toarray();
 var data = results;
//  results.forEach(element => {
//      data.push(element);
//  });
 output = table.table(data,config)
  console.log('Products for sale: ', output);
});
 
connection.end();
};//end viewAll()
/*********begin view low */
function viewLow(){
    connection.query('SELECT product_name from products where stock_quantity < 10', function (error, results, fields) {
        if (error) throw error;
    console.log("the products below have a stock less than 10:");
    results.forEach(e => {
        console.log(e.product_name)
    });
      });
       
      connection.end();
};
/***************************start update********** */
function updateAmt(id,num){
      connection.query("UPDATE products SET ? WHERE ?", [{
          stock_quantity: num
      }, {
          item_id: id
      }], function (err, results) {
          if (err) throw err;
  console.log("new stock for id " + id +": " + num)
  connection.end();
      });
}//end update()
/*************************start check funct *******************************/
function checkSupply(id,num){
      let readQuery = "select stock_quantity from products where item_id = " + id ;
     connection.query(readQuery, function (err, results) {
         if (err) throw err;
        let request = parseInt(num);
        let newAmt = request + results[0].stock_quantity
        updateAmt(id, newAmt);
     });
    }
    /*************************end check funct *******************************/
/*************************start add funct *******************************/
function addInventory(){
inquirer.prompt([/* Pass your questions in here */
    {
        name: "idOfItem",
        type: "input",
        message: "enter the ID of the item you would like to add inventory to.",
      },
      {
          name: 'howMany',
          type: 'input',
          message: "How many would you like?"
      },//end questions
]).then(answers => {
  checkSupply(answers.idOfItem,answers.howMany)
});
}//end addInventory()
//above this is my test connection below this is the start of my inquiere
/*************** start addNew() *****************/
function addNew(){
    inquirer.prompt([/* Pass your questions in here */
        {
            name: "nameOfItem",
            type: "input",
            message: "enter the product_name of the item you would like to add to inventory.",
          },
          {
              name: 'department_nameOfItem',
              type: 'input',
              message: "enter the department_name of the item you would like to add to inventory."
          },
          {
              name: 'priceOfItem',
              type: 'input',
              message: "enter the price of the item you would like to add to inventory."
          },
          {
            name: 'stock_quantityOfItem',
            type: 'input',
            message: "enter the stock_quantity of the item you would like to add to inventory."
        },//end questions
    ]).then(answers => {
        var query = connection.query('INSERT INTO products SET ?', 
            { product_name:answers.nameOfItem,
                department_name: answers.department_nameOfItem,
                price: answers.priceOfItem,
                stock_quantity: answers.stock_quantityOfItem
        }, function (error, results, fields) {
            if (error) throw error;
            // Neat!
            console.log("added new item: " + answers.nameOfItem)
          });
          connection.end();
    });
}
/*************** start addNew() *****************/

inquirer.prompt([/* Pass your questions in here */
{
    type: 'list',
    name:'question1',
    message:'what would you like to do?',
    choices: ['View Products for Sale','View Low Inventory','Add to Inventory', 'Add New Product']

},
//end questions
]).then(answers => {
    console.log(answers.question1)
    // Use user feedback for... whatever!!
    //make method for each option. each one might need its own prompt?
    switch (answers.question1) {
        case'View Products for Sale':
            console.log("you picked: 'View Products for Sale'")
            viewAll();
            break;
            
            case'View Low Inventory':
            console.log("you picked: ''View Low Inventory''")
            viewLow();
            break;
            
            case'Add to Inventory':
            console.log("you picked: 'Add to Inventory'")
            addInventory();
            break;

            case'Add New Product':
            console.log("you picked: 'Add New Product'")
            addNew();
            break;

    
        default:
            break;
    }
});