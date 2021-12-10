drop database if exists employeetrack_db;
create database employeetrack_db;

use employeetrack_db;

CREATE TABLE department (
  id INT NOT NULL auto_increment,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT not NULL auto_increment ,
  title VARCHAR(30) NOT NULL ,
  salary Decimal,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
 
);

CREATE TABLE employee (
  id INT not NULL auto_increment,
  first_name VARCHAR(30) ,
  last_name VARCHAR(30) ,
  role_id varchar(50),
  manager_id INT,
  primary key(id)

  
);