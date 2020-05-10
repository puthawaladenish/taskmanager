//init code
const router = require('express').Router();
const bodyparser = require('body-parser');
const { check, validationResult } = require('express-validator');
const taskmodel = require('./../dbmodel/taskmodel');
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
    check('description').not().isEmpty().trim().escape(),
    check('deadline').not().isEmpty().trim().escape()
], (req, res) => {
    // check form data validation error
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
        res.json({
            status: true,
            message: 'Task - Form data validation error',
            error: errors.array()
        });
    }

    // new task objet/model
    const temp = new taskmodel({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        userID: req.userID
    });
    temp.save((error, result) => {
        if (error) {
            res.json({
                status: false,
                message: 'Fail to create Task',
                error: error
            });
        }
        res.json({
            status: true,
            message: 'New task created successfully',
            result: result
        });
    });
});


// export router
module.exports = router;