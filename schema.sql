DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE temployees_DB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    role_title VARCHAR(30) NOT NULL,
    salary DECIMAL(12,5) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
)

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,  
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT REFERENCES employee(id) ,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id)
)

INSERT INTO department (department_name) VALUES ("Finance");
INSERT INTO department (department_name) VALUES ("IT");
INSERT INTO department (department_name) VALUES ("Accounting");
INSERT INTO department (department_name) VALUES ("R&D");
INSERT INTO department (department_name) VALUES ("HR");


INSERT INTO role(role_title,salary,department_id) VALUES ("Manager",100000.67,3);
INSERT INTO role(role_title,salary,department_id) VALUES ("Engineer",90000.67,3);
INSERT INTO role(role_title,salary,department_id) VALUES ("Manager",70000.67,2);
INSERT INTO role(role_title,salary,department_id) VALUES ("Intern",80000.67,2);
INSERT INTO role(role_title,salary,department_id) VALUES ("Manager",100000.67,4);
INSERT INTO role(role_title,salary,department_id) VALUES ("Engineer",98000.67,2);
INSERT INTO role(role_title,salary,department_id) VALUES ("Engineer",98000.67,1);


INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES("Anu","Rav",1);
INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES("Ash","Aita",6,1);
INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES("Phane","Rav",4,2);




 
