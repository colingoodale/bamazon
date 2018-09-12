const inquirer = require("inquirer");
const http = require("http");
const fs = require("fs");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected id: " + connection.threadId);

});

inquirer
    .prompt(
        {
            type: "rawlist",
            name: "start",
            message: "Would you like to start shopping?",
            choices: ["YES", "NO"]
        })
    .then(function (answer) {
        if (answer.start.toUpperCase() === "YES") {
            orderProducts();
        } else {
            console.log("This ain't Amazon fool!")
        }

    });




//display available options
function showProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}
//order product function
function orderProducts() {
    showProducts();
    inquirer.prompt(
        {
            type: "rawlist",
            name: "choice",
            message: "Please enter the product you would like to purchase.",
            choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(res[i].product_name);
                }
                return choiceArray;
            },

        })
        .then(function (id) {
            console.log(choiceArray);

            inquirer.prompt(
                {
                    type: "rawlist",
                    name: "continue",
                    message: "Would you like to make another purchase?",
                    choices: ["YES", "NO"]
                }).then(function (cont) {
                    if (cont === "YES") {
                        orderProducts();
                    } else {
                        console.log("Have a nice day!");
                        connection.end();
                    }
                })
        })
}

//Create update function to run inside orderProducts

// function updateProducts(){

// }

// function 