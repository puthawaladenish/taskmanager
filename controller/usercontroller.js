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

//export router
module.exports = router;