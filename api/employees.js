const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const { v4: uuidv4 } = require('uuid');


let employees = [];

router.route('/employees')
    //create
    .post(
        body('name').isLength({min: 1}).withMessage('Name required'),
        body('age').isNumeric().withMessage('Age must be a digit'),
        body('gender').isLength({min:1}).withMessage('Gender required'),
        (req, res) => {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            const {name, age, gender} = req.body;

            let newEmployee = new Employee(uuidv4(),name, age, gender);
            employees.push(newEmployee);
            res.status(200).json({
                success: true, message: 'Employee added', employee: newEmployee
            })

    })
    //fetch all
    .get((req, res) => {
        res.json(employees);
    });

router.route('/employees/:id')
    //fetch by id
    .get((req, res) => {
        let myEmployee = employees.find((employee) => employee.id === req.params.id);

        res.json({
            message: myEmployee ? 'Employee found' : 'Employee not found', employee: myEmployee
        });

    })
    //update by id
    .put(
        body('name').isString().withMessage('Must be a string'),
        body('age').isNumeric().withMessage('Age must be a digit'),
        body('gender').isString().withMessage('Gender must be a string'),
        (req, res) => {
        const emp_id = req.params.id;
        const {name, age, gender} = req.body;
        const newEmployee = new Employee(req.params.id, name, age, gender);

        let myEmployee = employees.find((employee) => employee.id == req.params.id);
        employees = employees.map((employee) => {
            if (employee.id == emp_id){
                return newEmployee
            }
            return employee
        });

        res.status(myEmployee ? 200 : 404).json(myEmployee ? {success:true} : {success:false});
    })
    //delete by id
    .delete((req, res) => {
       employees =  employees.filter((employee) => employee.id != req.params.id);

       res.status(200).json({message:'Employee deleted',success:true})
    });

router.route('/employees/filter-by-age')
    .post((req, res) => {
    const age = req.body;
    let min = parseInt(age.min);
    let max = parseInt(age.max);

    if (min>max){
        res.status(400).json({success:false, message:"Minimum age cannot be greater than maximum age!"});
    }
    else {
        let filterEmployees = employees.filter((employee) => parseInt(employee.age) >= min && parseInt(employee.age) <=max );
        if (filterEmployees.length >0){
            res.status(200).json({success:true, filterEmployees});
        }
        else {
            res.status(200).json({success:false, message:"No employees within that age bracket!"});
        }
    }


});

class Employee {

    constructor(id, name, age, gender) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

}

module.exports = router