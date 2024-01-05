const inquirer = require("inquirer");
const db = require("./db/connecter.js");

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  employee_tracker();
});

//function to prompt the user
var employee_tracker = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompt",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
          "Log Out",
        ],
      },
    ])
    //begin if statements for excecution of chosen option
    .then((answers) => {
      //what to do if user chooses View All Department
      if (answers.prompt === "View All Departments") {
        db.query(`SELECT * FROM dept`, (err, result) => {
          if (err) throw err;
          console.log("Viewing All Departments: ");
          console.table(result);
          employee_tracker();
        });
        //what to do if user chooses View All Roles
      } else if (answers.prompt === "View All Roles") {
        db.query(`SELECT * FROM roles`, (err, result) => {
          if (err) throw err;
          console.log("Viewing All Roles: ");
          console.table(result);
          employee_tracker();
        });
        //what to do if user chooses View All Employees
      } else if (answers.prompt === "View All Employees") {
        db.query(`SELECT * FROM employees`, (err, result) => {
          if (err) throw err;
          console.log("Viewing All Employees: ");
          console.table(result);
          employee_tracker();
        });
        //what to do if user chooses Add A Department
      } else if (answers.prompt === "Add A Department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: "Name the department.",
              validate: (departmentInput) => {
                if (departmentInput) {
                  return true;
                } else {
                  console.log("Please Add A Department!");
                  return false;
                }
              },
            },
          ])
          .then((answers) => {
            db.query(
              `INSERT INTO dept (name) VALUES (?)`,
              [answers.department],
              (err, result) => {
                if (err) throw err;
                console.log(`Added ${answers.department} to the database.`);
                employee_tracker();
              }
            );
          });
        //what to do if user chooses Add A Role
      } else if (answers.prompt === "Add A Role") {
        db.query(`SELECT * FROM dept`, (err, result) => {
          if (err) throw err;
          // prompt the user to add a role, then salary, then department
          inquirer
            .prompt([
              {
                type: "input",
                name: "role",
                message: "Name the role.",
                validate: (roleInput) => {
                  if (roleInput) {
                    return true;
                  } else {
                    console.log("Please Add A Role!");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "salary",
                message: "Set the salary of the role.",
                validate: (salaryInput) => {
                  if (salaryInput) {
                    return true;
                  } else {
                    console.log("Please Add A Salary!");
                    return false;
                  }
                },
              },
              {
                type: "list",
                name: "department",
                message: "Which department does the role belong to?",
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].name);
                  }
                  return array;
                },
              },
            ])
            //take the results and append them to a variable to be added to the database
            .then((answers) => {
              for (var i = 0; i < result.length; i++) {
                if (result[i].name === answers.department) {
                  var department = result[i];
                }
              }

              db.query(
                `INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)`,
                [answers.role, answers.salary, department.id],
                (err, result) => {
                  if (err) throw err;
                  console.log(`Added ${answers.role} to the database.`);
                  employee_tracker();
                }
              );
            });
        });
        //what to do if user chooses Add An Employee
      } else if (answers.prompt === "Add An Employee") {
        db.query(`SELECT * FROM employees, roles`, (err, result) => {
          if (err) throw err;
          //prompt the user to add the employees first name, then last name, then role, then manager
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "Enter employees first name.",
                validate: (firstNameInput) => {
                  if (firstNameInput) {
                    return true;
                  } else {
                    console.log("Please Add A First Name!");
                    return false;
                  }
                },
              },
              {
                type: "input",
                name: "lastName",
                message: "Enter employees last name.",
                validate: (lastNameInput) => {
                  if (lastNameInput) {
                    return true;
                  } else {
                    console.log("Please Add A Last Name!");
                    return false;
                  }
                },
              },
              {
                type: "list",
                name: "role",
                message: "Enter the employees role.",
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].title);
                  }
                  var newArray = [...new Set(array)];
                  return newArray;
                },
              },
              {
                type: "input",
                name: "manager",
                message: "Enter their managers id in the database(numeric).",
                validate: (managerInput) => {
                  if (managerInput) {
                    return true;
                  } else {
                    console.log("Please Add A Manager!");
                    return false;
                  }
                },
              },
            ])
            //take the results and append them to a variable to be added to the database
            .then((answers) => {
              for (var i = 0; i < result.length; i++) {
                if (result[i].title === answers.role) {
                  var role = result[i];
                }
              }

              db.query(
                `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`,
                [answers.firstName, answers.lastName, role.id, answers.manager],
                (err, result) => {
                  if (err) throw err;
                  console.log(
                    `Added ${answers.firstName} ${answers.lastName} to the database.`
                  );
                  employee_tracker();
                }
              );
            });
        });
        //what to do if user chooses Update An Employee Role
      } else if (answers.prompt === "Update An Employee Role") {
        db.query(`SELECT * FROM employees, roles`, (err, result) => {
          if (err) throw err;
          //prompt the user to choose an employee to update, then add the new role,
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Choose an employee to update the role of.",
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].last_name);
                  }
                  var employeeArray = [...new Set(array)];
                  return employeeArray;
                },
              },
              {
                type: "list",
                name: "role",
                message: "Enter their new role",
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].title);
                  }
                  var newArray = [...new Set(array)];
                  return newArray;
                },
              },
            ])
            //take the results and append them to a variable to be added to the database
            .then((answers) => {
              for (var i = 0; i < result.length; i++) {
                if (result[i].last_name === answers.employee) {
                  var name = result[i];
                }
              }

              for (var i = 0; i < result.length; i++) {
                if (result[i].title === answers.role) {
                  var role = result[i];
                }
              }

              db.query(
                `UPDATE employees SET ? WHERE ?`,
                [{ roles_id: role }, { last_name: name }],
                (err, result) => {
                  if (err) throw err;
                  console.log(
                    `Updated ${answers.employee} role to the database.`
                  );
                  employee_tracker();
                }
              );
            });
        });
        //what to do if user chooses Log Out
      } else if (answers.prompt === "Log Out") {
        db.end();
        console.log("Ciao!");
      }
    });
};
