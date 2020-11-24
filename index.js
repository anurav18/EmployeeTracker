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
        if (answer.Table === "departments") {
            console.log(answer.Action);
          Departments(answer.Action);
        }
        else if(answer.Table === "roles") {
          Roles(answer.Action);
        } 
        else if(answer.Table === "employees"){
          employees(answer.Action);
        }
        else{
          connection.end();
        }
      });
  }

//Add a new item to departments table
  function Departments(action) {

    switch(action){
        //Add a new item to the department table
       case "post":
        inquirer
        .prompt([
          {  name: "department_name",
            type: "input",
            message: "What is the Name of the department?"   
          }
        ])
        .then(function(answer) {
          connection.query(
            "INSERT INTO department SET ?",
            {
              department_name: answer.department_name
            },
            function(err) {
              if (err) throw err;
              console.log("A entry is successfully created in Departments table!");
              start();
            }
          );
        });
        break;
        //Update the departments Table
        case "update":
            inquirer.prompt([
            {
                name:"field_id",
                type:"number",
                message:"enter id of the department you would like to update"
                
            },
            {
                name: "update_field",
                type: "input",
                message: "Enter the updated value of the department?"

            }
            ]).then(function(answer){
                connection.query(
                    "UPDATE department SET ? WHERE ?",
                    [
                      {
                        department_name: answer.update_field
                      },
                      {
                        id:answer.field_id
                      }
                    ],
                    function(error) {
                      if (error) throw err;
                      console.log("item updated successfully!");
                      start();
                    }
                  );
                });
                
                break;
        //Read the SQL table
        case "read":
            connection.query(
                "SELECT department.id as ID,department.department_name as DEPARTMENT from department ",
                function(err,result) {
                  if (err) throw err;
                  console.table(result);
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
                start();
                }
            );
            });
            break;

        case "update":
            
            break;
        
        case "read":
            connection.query(
                "SELECT * FROM role",
                function(err,result) {
                  if (err) throw err;
                  console.table(result);
                  start();
                }
              );
              break;
    }
  }


//Create a list of Roles
var rolesArr = [];
function Roleslist(){
    connection.query(
        "SELECT * FROM role",
        function(err,result) {
          if (err) throw err;
          for(i = 0; i < result.length;i++)
          {
             rolesArr.push(result[i].role_title);
          }  
        });
      return rolesArr;
}

var managersArr = [];
function ManagersList(){
    connection.query(
        "SELECT first_name,last_name FROM employee WHERE role_id = 1",
        function(err,result) {
          if (err) throw err;
          for(i = 0; i < result.length;i++)
          {
             managersArr.push(result[i].first_name);
          }  
        });
      return managersArr;
}

///

  function employees(action)
  {
      switch(action){
          case "post":
              inquirer.prompt([
              {
                  name: "first_name",
                  type: "input",
                  message:"Please enter the first name of the employee"
              },
              {
                name: "last_name",
                type: "input",
                message:"Please enter the last name of the employee"
            },
            {
                name: "role",
                type: "list",
                message:"Please select the role from list",
                choices: Roleslist()
            },
            {
                name: "manager_id",
                type: "rawlist",
                message:"Please enter the Name of Manager",
                choices: ManagersList()
            } 
        ]).then(function(answer){
            var role_id = Roleslist().indexOf(answer.role)+1;
            var manager_id = ManagersList().indexOf(answer.manager_id)+1;
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name:answer.last_name,
                    role_id:role_id,
                    manager_id:manager_id
                },
                function(err) {
                if (err) throw err;
                console.log("A entry is successfully created in Employees table!");
                // re-prompt the user for if they want to bid or post
                start();
                }
            );
        })
              break;

          case "update":
              break;

          case "read":
              connection.query(
                  "SELECT employee.first_name as FirstName, employee.last_name as LastName, role.role_title as Role, department.department_name as DEPARTMENT FROM employee,role,department WHERE department.id = role.department_id and role.id = employee.role_id",
                  function(err,result){
                      if (err) throw err;
                      console.table(result);
                      start();
                  }

              );
              break;
      }


  }
