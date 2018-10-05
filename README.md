Bamazon

Video demo:
https://drive.google.com/file/d/1xjK7rsnbktu2898Tvq_tAVIwrVZqTtOp/view

This is a Command Line app that mimics store functions.

The node server coded in bamazoncustomer.js prints a list of all available
items at the gaming store (drawing ID numbers, Product Names, and Prices 
from the products table of the bamazon mysql database).  It then asks 
for the ID of the product the customer wishes to buy, then the
quantity of that item, and then check the requested quantity against the
quantity in the database, and if there is enough quantity to cover the
order, it calculates and outputs a total price for the customer and updates
the products table with the remaining quantity of the purchased item.

The npm modules I'm using for Bamazon are :

mysql (to interact with the database),
inquirer (to handle user inputs), and 
cli-table (to draw the table to the console).