Bamazon

Video demo (autopsy):
https://drive.google.com/file/d/1X2HiJUQkW8UJsIjynQGULyCXEwwSLKHz/view

This is intended to be a Command Line app that mimics store functions.

The bamazoncustomer.js file is intended to print a list of all available
items at the store (drawing ID numbers, Product Names, and Prices from
the products table of the bamazon mysql database).  It is then supposed
to ask for the ID of the product the customer wishes to buy, then the
quantity of that item, then check the requested quantity against the
quantity in the database, and if there is enough quantity to cover the
order, to calculate and output a total price for the customer and update
the products table with the remaining quantity of the purchased item.

It's not doing that now, however.  Right now, it draws the table in the 
console, but I don't know how to get it to take input and do queries in 
the necessary sequence to get the functionality I want.  Not only that,
but I can't get to the debugger in vscode to progress to the point that
the app gets to in the git bash view of the node console, which makes it
hard to troubleshoot.  This is explained in the video demo linked above.

The npm modules I'm using for Bamazon are mysql (to interact with the database),
inquirer (to handle user inputs), and cli-table (to draw the table to the 
console).