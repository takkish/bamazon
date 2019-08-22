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
    database: "shelter_manager"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "action",
        choices: ["Add a shelter", "Add a pet for adoption", "Adopt a pet", "Exit"]
    }]).then(function (answers) {
        switch (answers.action) {
            case "Add a shelter":
                getAndAddAnimalShelterInfo();
                break;
            case "Add a pet for adoption":
                getAndAddPetInfo();
                break;
            case "Adopt a pet":
                getPetInfoAndAdopt();
                break;
            case "Exit":
                end();
                break;
        }
    });
}

function end() {
    connection.end();
    console.log("thanks for using shelter cli!");
}

function getAndAddAnimalShelterInfo() {
    console.log("Please input shelter information below:");
    inquirer.prompt([{
        type: "input",
        name: "name"
    }, {
        type: "input",
        name: "location"
    }]).then(function (answers) {
        addAnimalShelter(answers.name, answers.location)
    });
}

function addAnimalShelter(name, location) {
    connection.query(
        "INSERT INTO shelters SET ?",
        {
            name: name,
            location: location
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " shelter inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            start();
        }
    );
}

function getAndAddPetInfo() {
    connection.query("SELECT * FROM pet_types", function (err, types) {
        if (err) throw err;
        var typeChoices = [];
        for (var i = 0; i < types.length; i++) {
            typeChoices.push({
                name: types[i].type,
                value: types[i].id
            });
        }
        connection.query("SELECT * FROM shelters", function (err, shelters) {
            if (err) throw err;
            var shelterChoices = [];
            for (var i = 0; i < shelters.length; i++) {
                shelterChoices.push({
                    name: shelters[i].name,
                    value: shelters[i].id
                });
            }

            console.log("Please input pet going up for adoption information below:");
            inquirer.prompt([{
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
            }]).then(function (answers) {
                addPet(answers.name, answers.description, answers.type, answers.shelter)
            });
        });
    });
}

function addPet(name, description, typeId, shelterId) {
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

function getPetInfoAndAdopt() {
    connection.query("SELECT * FROM pet_types", function (err, types) {
        if (err) throw err;
        var typeChoices = [];
        for (var i = 0; i < types.length; i++) {
            typeChoices.push({
                name: types[i].type,
                value: types[i].id
            });
        }

        console.log("Please provide what type of animal you'd like to adopt:");
        inquirer.prompt([{
            type: "list",
            name: "type",
            choices: typeChoices
        }]).then(function (answers) {
            connection.query("SELECT * FROM pets WHERE ? AND ?",
                [{ pet_type_id: answers.type}, {adopted: false}],
                function (err, pets) {
                    if (err) throw err;
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
                    inquirer.prompt([{
                        type: "list",
                        name: "pet",
                        message: "Choose a pet to adopt",
                        choices: petChoices
                    }]).then(function (answers) {
                        if (answers.pet === -1) {
                            return start();
                        }
                        adoptPet(answers.pet);
                    });
                });
        });
    });
}

function adoptPet(petId) {
    connection.query(
        "UPDATE pets SET ? WHERE ?",
        [
            {
                adopted: true
            },
            {
                id: petId
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " pet adopted!\n");
            start();
        }
    );
}
