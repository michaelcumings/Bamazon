var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table")

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

var table = new Table({
    head: ['ID#', 'Product Name', 'Price']
// , colWidths: [100, 200, 300]
});

function start() {
  drawtable();
  // choice();
}

function drawtable() {
    // instantiate

    table.head = ['ID#', 'Product Name', 'Price'];

    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          table.push(
              [res[i].item_id, res[i].product_name, res[i].price]
            );
        }
        connection.pause();
            console.log(table.toString());
            choice();
        // connection.resume();
        return;
        // choice();
      });
}

function choice() {
    // console.log(table.toString());
    connection.resume();
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
            // console.log("That's not going to work, try again.");
            // // choice();
            // return;
        var quantity = answer.quantity;
        var price = answer.price;
        var itemno = answer.itemno;
        var stock_quantity = res.stock_quantity;
        if (quantity > stock_quantity) {
            var updated = (res.stock_quantity - quantity);
            var query = "UPDATE products SET stock_quantity = ?, stock_quantity WHERE item_id = ?";
            connection.query(query, [updated, itemno], function (err,res) {
                var total = (quantity * price);
                console.log("You bought " + quantity + " of item number " + itemno + " for a total cost of " + total + ".");
            }); 
        } else {
                console.log("Not enough quantity in stock to cover that amount!");
                return;

            }
        });

      });
    }


start();