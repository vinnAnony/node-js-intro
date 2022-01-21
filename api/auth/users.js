const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
require("dotenv").config();


let users = [];

router.route('/login')
    .post(
        body('email').not().isEmpty().withMessage('Email required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').not().isEmpty().withMessage('Password required'),
        (req, res) => {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            const {email, password} = req.body;
            let myUser = users.find((user) => user.email === email);
            if (myUser){
                if (password == myUser.password){

                    const user = {
                        id: myUser.id,
                        name: myUser.name,
                        email: myUser.email
                    };
                    const accessToken = jwt.sign({user}, process.env.JWT_KEY);

                    res.status(200).json({
                        accessToken,
                        user,
                        message: 'Success login',
                        success: true
                    });
                }else {
                    res.status(403).json({
                        message: 'Invalid credentials',
                        success: false
                    });
                }
            }else {
                res.status(403).json({
                    message: 'User does not exist',
                    success: false
                });
            }


        });

router.route('/register')
    //create
    .post(
        body('name').isLength({min: 1}).withMessage('Name required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({min:4}).withMessage('Password too short'),
        (req, res) => {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            const {name, email, password} = req.body;

            let newUser = new User(uuidv4(),name, email, password);
            users.push(newUser);
            res.status(200).json({
                message: 'User added',
                success: true,
            })

        });
router.route('/users')
    //fetch all users
    .get((req, res) => {
        res.json(users);
    });


class User {

    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

}

module.exports = router