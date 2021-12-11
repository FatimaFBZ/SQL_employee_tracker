INSERT INTO department (name)
VALUES ( "Sales"),
       ("Accounting"),
       ( "web Dev"),
       ( "HR");
       
INSERT INTO role ( title, salary, department_id)
VALUES ( "Sales director", 100000, 1),
       ( "Accounting manager", 100000, 2),
       ( "web Dev senior",80000 ,3),
       ( "HR Manager",70000 ,4);
      

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Achebe",3, 1),
       ( "Slima", "Ayoubi", 4,2),
       ( "Debbie", "Wili",5,3),
       ( "Richard", "Jhones", 6,4); 

