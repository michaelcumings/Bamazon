//  node --inspect-brk bamazoncustomer.js
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table")

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});



function start() {
  drawtable();

}

function drawtable() {



    var table = new Table({
      head: ['ID#', 'Product Name', 'Price']

  });

    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          table.push(
              [res[i].item_id, res[i].product_name, res[i].price]
            );
        }

            console.log(table.toString());
            choice();

        return;

      });
}

function choice() {

    inquirer
    .prompt([
      {
        name: "itemno",
        type: "input",
        message: "Enter the ID of the item you wish to buy: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "And how many of that item?: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT item_id, stock_quantity, price FROM products WHERE item_id = ?";
      connection.query(query, [answer.itemno], function(err, res) {
        if (err) throw err;
        var quantity = parseInt(answer.quantity);
        var price = parseFloat(res[0].price);
        var itemno = answer.itemno;
        var stock_quantity = res[0].stock_quantity;
        if (quantity <= stock_quantity) {
            var updated = (stock_quantity - quantity);
            var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
            connection.query(query, [updated, itemno], function (err,res) {
                var total = (quantity * price);
                console.log("You bought " + quantity + " of item number " + itemno + " for a total cost of $" + total.toFixed(2) + ".");
            }); 
            start();
            return;
        } else {
                console.log("Not enough quantity in stock to cover that amount!");
                choice();
                return;

            }
        });

      });
    
    }


start();