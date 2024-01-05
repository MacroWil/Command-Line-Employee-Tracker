const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: "root",
  // Your MySQL password
  password: "1337",
  database: "employees_db",
});

module.exports = db;
