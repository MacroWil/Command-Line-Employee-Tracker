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
        //what to do if user chooses Log Out
      } else if (answers.prompt === "Log Out") {
        db.end();
        console.log("Ciao!");
      }
    });
};
