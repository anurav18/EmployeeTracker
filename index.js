var inquirer = require("inquirer");
var mysql = require("mysql");

//Connect to sql database

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "9503Hancockave!",
    database: "employees_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
  });

  //Function to know which table needs to have an action

  // function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt([{
        name: "Table",
        type: "list",
        message: "Which table would you like to access?",
        choices: ["departments", "employees", "roles"]
      },
      {
        name: "Action",
        type: "list",
        message: "What action would you like to perform?",
        choices: ["post", "update", "read"]
      }
    ])
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.Table === "departments") {
            console.log(answer.Action);
          Departments(answer.Action);
        }
        else if(answer.Table === "roles") {
          Roles(answer.Action);
        } else{
          connection.end();
        }
      });
  }

//Add a new item to departments table
  function Departments(action) {
    // prompt for info about the item being put up for auction
    switch(action){
       case "post":
        inquirer
        .prompt([
          {
            name: "department_name",
            type: "input",
            message: "What is the Name of the department?"
          }
        ])
        .then(function(answer) {
          // when finished prompting, insert a new item into the db with that info
          connection.query(
            "INSERT INTO department SET ?",
            {
              department_name: answer.department_name
            },
            function(err) {
              if (err) throw err;
              console.log("A entry is successfully created in Departments table!");
              // re-prompt the user for if they want to bid or post
              start();
            }
          );
        });
        break;

        case "update":
            console.log("updated!");
            start();
            break;
        
        case "read":
            connection.query(
                "SELECT * FROM department",
                function(err,result) {
                  if (err) throw err;
                  console.log(result);
                  console.log(result[0].id);
                  // re-prompt the user for if they want to bid or post
                  start();
                }
              );
              break;


    }
  
  }

  function Roles(action){
   switch(action){
        case "post":
            inquirer
            .prompt([
            {
                name: "role_title",
                type: "input",
                message: "What is the title of the role?"
            },
            {
                name: "salary",
                type: "number",
                message: "What is the salary offered for this role?"
            },
            {
                name: "department_id",
                type: "number",
                message: "What is the department ID for this role?"
            }
            ])
            .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO role SET ?",
                {
                    role_title: answer.role_title,
                    salary:answer.salary,
                    department_id:answer.department_id
                },
                function(err) {
                if (err) throw err;
                console.log("A entry is successfully created in Roles table!");
                // re-prompt the user for if they want to bid or post
                start();
                }
            );
            });
            break;

        case "update":
            console.log("updated!");
            start();
            break;
        
        case "read":
            connection.query(
                "SELECT * FROM role",
                function(err,result) {
                  if (err) throw err;
                  console.log(result);
                  console.log(result[0].id);
                  // re-prompt the user for if they want to bid or post
                  start();
                }
              );
              break;


    }
  }
