//init code
const router = require('express').Router();

const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const { check, validationResult } = require('express-validator');
const token_key = process.env.TOKEN_KEY;
const task = require('./../dbmodel/taskmodel');
const moment = require('moment');
const verifyToken = require('./../middlewares/verify_token');

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

// create new task route

router.post('/newTask', verifyToken, [
    // check empty fields
    check('title').not().isEmpty().trim().escape(),
    check('description').not().isEmpty().trim(), escape(),
    check('deadline').not().isEmpty().trim().escape()
], (req, res) => {
    // check form data validation error
    const errors = validationResult(req);
    if (error.isEmpty() === false) {
        res.json({
            status: true,
            message: 'Task - Form data validation error',
            error: errors.array()
        });
    }
    //ok
    res.json({
        status: true,
        message: 'Task Form data Ok',
        result: req.body,
        userID: req.userID
    });
});


// export router
module.exports = router;