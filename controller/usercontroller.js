// init code
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const { check, validationResult } = require('express-validator');
const token_key = process.env.TOKEN_KEY;
const usermodel = require('../dbmodel/usermodel');


// middleware setup

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));


// router goes here
router.all('/', (req, res) => {
    res.json({
        status: true,
        message: 'User controller default route'
    });
});

// register new user route
router.post('/register', [
    //check empty field
    check('firstName').not().isEmpty().trim().escape(),
    check('lastName').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail()
], (req, res) => {
    //check validation error
    const error = validationResult(req);
    if (error.isEmpty === false) {
        res.json({
            status: false,
            message: 'From data validation error',
            error: error.array()
        });
    }
    //user password hashing
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    // store data to database
    const temp = new usermodel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
    });
    temp.save(function(error, result) {
        // check error
        if (error) {
            return res.json({
                status: false,
                message: 'User register failed',
                error: error
            });
        }

        //if everything OK
        res.json({
            status: true,
            message: 'user register success',
            result: result
        });
    });
});


//export router
module.exports = router;