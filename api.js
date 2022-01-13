const express = require('express');
const router = express.Router();

let employees = [];

router.route('/employees')
    //create
    .post((req, res) => {
        const employee = req.body;
        console.log(employee);
        employees.push(employee);
        res.json(employees);
    })
    //fetch all
    .get((req, res) => {
        res.json(employees);
        //res.send("I'm giving you all the employees in a bit...")
    });

router.route('/employees/:id')
    //fetch by id
    .get((req, res) => {
        let myEmployee = employees.find((employee) => employee.id == req.params.id);

        res.json(myEmployee);
        res.status(404).send('Employee not found');

    })
    //update by id
    .put((req, res) => {
        const emp_id = req.params.id;
        const newEmployee = req.body;
        let myEmployee = employees.find((employee) => employee.id == req.params.id);
        employees = employees.map((employee) => {
            if (employee.id == emp_id){
                return newEmployee
            }
            return employee
        });

        res.status(myEmployee ? 200 : 404);
    })
    //delete by id
    .delete((req, res) => {
       employees =  employees.filter((employee) => employee.id != req.params.id);

       res.status(200).json({message:'Employee deleted'})
    });


module.exports = router