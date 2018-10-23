var mysql      = require('mysql');
var inquirer = require('inquirer');
/*
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dude',
  database : 'bamazon'
});
 
connection.connect();
 
connection.query('SELECT * from products', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();
*/
//above this is my test connection below this is the start of my inquiere


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
            break;
            
            case'View Low Inventory':
            console.log("you picked: ''View Low Inventory''")
            break;
            
            case'Add to Inventory':
            console.log("you picked: 'Add to Inventory'")
            break;

            case'Add New Product':
            console.log("you picked: 'Add New Product'")
            break;

    
        default:
            break;
    }
});