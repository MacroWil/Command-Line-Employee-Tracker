INSERT INTO department (name)
VALUES ("manufacturing"),
    ("engineering"),
    ("marketing"),
    ("sales");

SELECT * FROM DEPARTMENT;

INSERT INTO role (title, salary, department_id)
VALUES ("project manager", 90000, 1),
    ("engineering manager", 225000, 2),
    ("machinist", 5000000, 1),
    ("software engineer", 120000, 2),
    ("manufacturing manager", 120000, 1),
    ("marketing team", 50000, 3),
    ("marketing lead", 150000, 3),
    ("sales rep", 85000, 4);

SELECT * FROM ROLE;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Brennan", 1, NULL),
    ("Duane", "Palmatier", 3, 2),
    ("Tom", "Bombadil", 2, 2),
    ("Martin", "King", 7, 2),
    ("Morgan", "Freeman", 8, 2);
    ("Steven", "Segal", 4, 2),
    ("Jerry", "Seinfeld", 5, 2),
    ("Mike", "Wazouski", 6, 2),

SELECT * FROM employee;