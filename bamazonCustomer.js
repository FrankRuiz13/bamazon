var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon" 
});

connection.connect(function(err) {
  if (err){
    console.log("err connecting: " +err);
  } 
  console.log("connected");
  loadProducts();
});

function loadProducts(){
    connection.query("SELECT * FROM products", function(err, data){
        if(err) throw err;
        console.log(data);
        promptCustomerForId(data);
    })
}
function promptCustomerForId(inventory){
    inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is the id of the item you would like to buy?",
      name: "id"
     
    }
  ])
  .then(function(inquirerResponse) {
        var userId = parseInt(inquirerResponse.id);
        var product = checkForInventory(userId, inventory);
        if(product){
            promptUserForQuantity(product);
        }
        else{
            console.log("invalid id");
            loadProducts();
        }
    })
}
function checkForInventory(id, inventory){
    for(var i=0; i<inventory.length; i++){
        if(inventory[i].item_id === id){
            return inventory[i];
        }
    }
    return null;
}
function promptUserForQuantity(product){
    inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Enter the Quantity",
      name: "quantity"
     
    }
  ])
  .then(function(inquirerResponse) {
        var quantity = parseInt(inquirerResponse.quantity);
        if(quantity< product.stock_quantity){
            makePurchase(product, quantity);
        }
        else{
            console.log("insufficient quantity");
            loadProducts();
        }
    })

}
function makePurchase(product, quantity){
    connection.query("", function(err, data){

    });
}