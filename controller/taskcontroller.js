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

// read all task from user
router.get('/getAllTask', verifyToken,
    (req, res) => {
        taskmodel.find({ userID: req.userID },
            (error, result) => {
                if (error) {
                    res.json({
                        status: false,
                        message: 'task read failed db error',
                        error: error
                    });
                }
                // check data empty
                if (!result) {
                    res.json({
                        status: false,
                        message: 'no task found',
                    });
                }
                res.json({
                    status: true,
                    message: ' task success',
                    result: result
                })
            }
        );
    });

// get singal task rest api
router.get('getTask', verifyToken, [
    check('taskID').not().isEmpty().trim().escape()
], (req, res) => {
    // check form data validation error
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
        res.json({
            status: true,
            message: 'TaskID - Form data validation error',
            error: errors.array()
        });
    }
    // get a task code
    taskmodel.findOne({ _id: req.query.TaskID, userID: req.userID },
        (error, resut) => {
            // check db error
            if (error) {
                res.json({
                    status: true,
                    message: 'database connetion error - task singal view ',
                    error: error
                });
            }
            //check result empty
            if (!result) {
                res.json({
                    status: false,
                    message: 'no task document found'
                });
            }
            //OK
            res.json({
                status: true,
                message: 'Get Task Success',
                result: result
            });
        }


    );
});

// update task rest api
router.put('/updateTask', verifyToken, [check('description').not().isEmpty().trim().escape(),
        check('deadline').not().isEmpty().trim(),
        check('taskID').not().isEmpty().trim()
    ],
    (req, res) => {
        // check form data validation error
        const errors = validationResult(req);
        if (errors.isEmpty() === false) {
            res.json({
                status: true,
                message: 'TaskID - Form data validation error',
                error: errors.array()
            });
        }
        // task update
        taskmodel.findOneAndUpdate({
                _id: req.body.taskID,
                userID: req.userID
            }, {
                description: req.body.description,
                deadline: req.body.deadline,
                updatededOn: moment().format('DD/MM/YYYY') + ';' + moment().format('hh:mm:ss')
            },
            (error, result) => {
                if (error) {
                    res.json({
                        status: faslse,
                        message: 'database error - taskupdate to db',
                        error: error
                    });
                }
                // database success
                res.json({
                    status: true,
                    message: 'database operation success',
                    result: result
                })
            }
        );
    });

router.put('/updateTaskStatus', verifyToken, [
    //check data
    check('taskID').not().isEmpty().trim().escape(),
    check('isDone').not().isEmpty().trim().escape()
], (req, res) => {
    // check form data validation error
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
        res.json({
            status: true,
            message: 'TaskID - Form data validation error',
            error: errors.array()
        });
    }
    //update task status
    taskmodel.findOneAndUpdate({
        _id: req.body.taskID,
        userID: req.userID
    }, { isDone: req });
    (error, result) => {
        if (error) {
            res.json({
                status: false,
                message: 'Database connection error- findandupdate status',
                error: error
            });
        }
        res.json({
            status: true,
            message: 'DB operation success',
            result: result
        })
    }
});

router.delete('/deleteTask', verifyToken, [
    check('taskID').not().isEmpty().trim().escape()
], (req, res) => {
    // check form data validation error
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
        res.json({
            status: true,
            message: 'TaskID - Form data validation error',
            error: errors.array()
        });
    }
    taskmodel.findByIdAndDelete({
        _id: req.body.taskID,
        userID: req.userID
    }, (error, result) => {
        if (error) {
            res.json({
                status: false,
                message: 'Database connection error- delete task',
                error: error
            });
        }
        //ok
        res.json({
            status: true,
            message: 'DB operation success',
            result: result
        });
    })
});



module.exports = router;