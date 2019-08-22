var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function queryPromise(query, inputs) {
    return new Promise(function (resolve, reject) {
        if (inputs) {
            connection.query(
                query,
                inputs,
                function (err, response) {
                    if (err) return reject(err);
                    resolve(response);
                }
            );
        } else {
            connection.query(
                query,
                function (err, response) {
                    if (err) return reject(err);
                    resolve(response);
                }
            );
        }
    });
}

async function start() {
    var answers = await inquirer.prompt([{
        type: "list",
        name: "action",
        choices: ["Add a product", "buy a product", "Exit"]
    }])
    switch (answers.action) {
        case "Add a product":
            getAndAddProductInfo();
            break;
        case "buy a product":
            getProductInfoAndBuy();
            break;
        case "Exit":
            end();
            break;
    }
}

function end() {
    connection.end();
    console.log("thanks for using shelter cli!");
}

async function getAndAddProductInfo() {
    console.log("Please input product information below:");
    var answers = await inquirer.prompt([{
        type: "input",
        name: "product_name"
    },
    {
        type: "input",
        name: "department_name"
    },
    {
        type: "input",
        name: "price"
    },
    {
        type: "input",
        name: "stock_quantity"
    }
    ]);
    addProduct(answers.product_name, answers.department_name,answers.price,answers.stock_quantity)
}

async function addProduct(product_name, department_name,price,stock_quantity) {
    var res = await queryPromise("INSERT INTO products SET ?", {
        product_name: product_name,
        department_name: department_name,
        price:price,
        quantity:stock_quantity,
        item_id:0
    });
    console.log(res.affectedRows + " product added!\n");
    // Call updateProduct AFTER the INSERT completes
    start();
}

async function getAndAddPetInfo() {
    var types = await queryPromise("SELECT * FROM pet_types");
    var typeChoices = [];
    for (var i = 0; i < types.length; i++) {
        typeChoices.push({
            name: types[i].type,
            value: types[i].id
        });
    }
    var shelters = await queryPromise("SELECT * FROM shelters");
    var shelterChoices = [];
    for (var i = 0; i < shelters.length; i++) {
        shelterChoices.push({
            name: shelters[i].name,
            value: shelters[i].id
        });
    }

    console.log("Please input pet going up for adoption information below:");
    var answers = await inquirer.prompt([{
        type: "input",
        name: "name"
    }, {
        type: "input",
        name: "description"
    }, {
        type: "list",
        name: "type",
        choices: typeChoices
    }, {
        type: "list",
        name: "shelter",
        choices: shelterChoices
    }]);

    addPet(answers.name, answers.description, answers.type, answers.shelter);
}

async function addPet(name, description, typeId, shelterId) {
    connection.query(
        "INSERT INTO pets SET ?",
        {
            name: name,
            description: description,
            pet_type_id: typeId,
            shelter_id: shelterId
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " pet inserted!\n");
            start();
        }
    );
}

async function getProductInfoAndBuy() {
    var types = await queryPromise("SELECT * FROM products");
    var typeChoices = [];
    for (var i = 0; i < types.length; i++) {
        typeChoices.push({
            name: types[i].type,
            value: types[i].id
        });
    }

    console.log("Please provide what type of animal you'd like to adopt:");
    var answers = await inquirer.prompt([{
        type: "list",
        name: "product",
        choices: typeChoices
    }])
    var pets = await queryPromise("SELECT * FROM pets WHERE ? AND ?",
        [{
            product: answers.product
        }, {
            stock_quantity:true,
        }]
    );
    var petChoices = [];
    for (var i = 0; i < pets.length; i++) {
        petChoices.push({
            name: pets[i].name + " - " + pets[i].description,
            value: pets[i].id
        });
    }
    petChoices.push({
        name: "Cancel",
        value: -1
    })
    var answers = await inquirer.prompt([{
        type: "list",
        name: "pet",
        message: "Choose a pet to adopt",
        choices: petChoices
    }])
    if (answers.pet === -1) {
        return start();
    }
    adoptPet(answers.pet);
}

async function adoptPet(petId) {
    var res = await queryPromise("UPDATE pets SET ? WHERE ?",
        [
            {
                adopted: true
            },
            {
                id: petId
            }
        ]);
    console.log(res.affectedRows + " pet adopted!\n");
    start();
}
// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// -- The app should then prompt users with two messages.

// -- The first should ask them the ID of the product they would like to buy.
// -- The second message should ask how many units of the product they would like to buy.
// -- Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// -- If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// -- However, if your store does have enough of the product, you should fulfill the customer's order.

// -- This means updating the SQL database to reflect the remaining quantity.
// -- Once the update goes through, show the customer the total cost of their purchase.
// -- If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.
