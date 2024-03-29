DROP DATABASE IF EXISTS employees_db;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE dept (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(20, 2) NOT NULL,
  dept_id INT NOT NULL,
  FOREIGN KEY (dept_id)
        REFERENCES dept(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT NOT NULL,
  manager_id INT NULL,
  FOREIGN KEY (roles_id)
        REFERENCES roles(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (manager_id)
        REFERENCES employees(id)
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);