INSERT INTO dept (name)
VALUES ("manufacturing"),
    ("engineering"),
    ("marketing"),
    ("sales");

SELECT * FROM DEPT;

INSERT INTO roles (title, salary, dept_id)
VALUES ("project manager", 90000, 1),
    ("engineering manager", 225000, 2),
    ("machinist", 5000000, 1),
    ("software engineer", 120000, 2),
    ("manufacturing manager", 120000, 1),
    ("marketing team", 50000, 3),
    ("marketing lead", 150000, 3),
    ("sales rep", 85000, 4);

SELECT * FROM ROLES;

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Steve", "Brennan", 1, 1),
    ("Duane", "Palmatier", 3, 1),
    ("Tom", "Bombadil", 2, 1),
    ("Martin", "King", 7, 1),
    ("Morgan", "Freeman", 8, 1),
    ("Steven", "Segal", 4, 1),
    ("Jerry", "Seinfeld", 5, 1),
    ("Mike", "Wazouski", 6, 1);

SELECT * FROM employees;