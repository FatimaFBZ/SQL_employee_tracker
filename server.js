const inquirer = require('inquirer');


function chooseRequest(){

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
]).then(function(answers){
console.log('answers', answers)
})
}