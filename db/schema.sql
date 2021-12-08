create database employeeTrack_db;

use employeeTrack_db;

CREATE TABLE departement (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT not NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary Decimal,
  departement_id INT,
  FOREIGN KEY (departement_id)
  REFERENCES departement(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);