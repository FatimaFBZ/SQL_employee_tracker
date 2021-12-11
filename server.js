const inquirer = require('inquirer');
var mysql = require('mysql');

var mysql = require('mysql2');
const { onErrorResumeNext } = require('rxjs/operators');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Benmalek2017$',
    database: 'employeetrack_db',

});


function chooseRequest() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'what would like to do?',
            choices: ['view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role'

            ],


        },
    ]).then(function (answers) {
        console.log('answers', answers)

        switch (answers.request) {
            case 'view all departments':
                viewDepts();
                break;
            case 'view all roles':
                viewRoles();
                break;
            case 'view all employees':
                viewEmployees();
                break;
            case 'add a department':
                addDept();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmpl();
                break;
            case 'update an employee role':
                updateEmpR();
                break;
            default:
                console.log("default")
                break;

        }
    })
}

chooseRequest()

function viewDepts() {
    console.log('view all departments')
    connection.query('select * from department', function (err, results) {
        console.log('all the departments', err, results)
        console.table(results)

        // var newArray = []
        // for (let i = 0; i < results.length; i++) {
        //     var obj = {
        //         name: results[i].name,
        //         value: results[i].id
        //     }
        //     newArray.push(obj)

        // }
        chooseRequest()
    });

}

function viewRoles() {
    console.log('view all roles')
    connection.query('select * from role', function (err, results) {
        console.log('all the role', err, results)
        console.table(results)

        chooseRequest()
    });

};

function viewEmployees() {
    console.log('view all employees')

    connection.query('select * from employee', function (err, results) {
        console.log('all the employee', err, results)
        console.table(results)

        chooseRequest()
    });
};



function addRole() {
    console.log('add a role')
    connection.query('select * from department', function (err, answers) {
        console.log('all the role', err, answers)

        var newArray = []
        for (let i = 0; i < answers.length; i++) {
            var obj = {
                value: answers[i].id,
                name: answers[i].name,
            }
            newArray.push(obj)

        }
        console.log('newArray', newArray)
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: "what is the title of the role?"
            },

            {
                type: 'input',
                name: 'salary',
                message: "what is the salary"
            },
            {
                type: 'list',
                name: 'department',
                message: "what department the role is belong to???",
                choices: newArray
            },
        ]).then(function (answers) {
            console.log('inside then add role', answers)


            connection.query('INSERT INTO role (title, salary,department_id) VALUES(?,?,?)',
                [answers.title, answers.salary, answers.department_id],
                function (err, answers) {
                    console.log('ERRR!!!', err)
                    console.log('we did it', answers)
                    console.table(answers)
                    chooseRequest()

                })

        })
    })
};

function addDept() {
    console.log('add a department')
    //connection.query('select * from department', function (err, answers) {

    // var newArray = []
    // for (let i = 0; i < answers.length; i++) {
    //     var obj = {
    //         value: answers[i].id,
    //         name: answers[i].name
    //     }
    //     newArray.push(obj)

    // }

    inquirer.prompt([


        {
            type: 'input',
            name: 'name',
            message: "what is your name of department?"
        },

    ]).then(function (answers) {
        console.log('inside then add department', answers)

        connection.query('INSERT INTO department (name) VALUES (?)',
            [answers.name],
            function (err, results) {
                console.log('ERRR!!!', err)
                console.log('we did it', results)
                console.table(results)
                chooseRequest()

            })

    })
    // })

};
function addEmpl() {
    console.log('add an employee')
    connection.query('select * from employee', function (err, results) {
        console.log('all the employee', err, results)

        var newArray = []
        for (let i = 0; i < results.length; i++) {
            var obj = {
                first_name: results[i].first_name,
                last_name: results[i].last_name,
                role_id: results[i].role_id,
                manager_id: results[i].manager_id
            }
            newArray.push(obj)

        }
        console.log('newArray', newArray)
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "what is your first_name?"
            },

            {
                type: 'input',
                name: 'last_name',
                message: "what is your last_name?"
            },
            {
                type: 'input',
                name: 'role_id',
                message: "what is your role_id"
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "what is your manager_id?",
                choices: newArray
            },
        ]).then(function (answers) {
            console.log('inside then add employee', answers)

            connection.query('INSERT INTO employee (first_name, last_name ,role_id, manager_id) VALUES(?,?,?,?)',
                [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
                function (err, result) {
                    console.log('we did it', result)
                    console.table(result)
                    chooseRequest()

                })

        })
    })
};

function updateEmpR() {
    connection.query('select * from employee', function (err, allEmployees) {
        var employeeChoices=[]
        for (let i = 0; i < allEmployees.length; i++) {
            var obj = {
                name:`${allEmployees[i].first_name} ${allEmployees[i].last_name}`,
                value:allEmployees[i].id
            }
            employeeChoices.push(obj)
        }
        inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Which Employee do you want to update?",
                choices: employeeChoices
            }
        ]).then(function (answers) {   
    let employee_id = answers.employee_id;

    connection.query('select * from role', function (err, answers) {
        var newRole=[]
        for (let i = 0; i < answers.length; i++) {
            var obj = {
                name:answers[i].title,
                value: answers[i].id
            }
            newRole.push(obj)

        }
        inquirer.prompt([
            {
                type: "list",
                name: "role_id",
                message: "which role do you want to assign?",
                choices: newRole
            }
        ]).then(function (answers) {
            //connection.query('INSERT INTO employee (name,role_id) VALUES(?,?)',
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?;',   
            [ answers.role_id, employee_id],
                 (err, answers) =>{
                     console.log('err',err)
                    console.log('we did it', answers)
                    console.table(answers)
                    console.table(answers)
                    chooseRequest()

                })

        })
    });

    });

})
}

    
        
