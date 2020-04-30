// init code
const mongoose = require('mongoose');
const moment = require('moment');


//user schema model

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: moment().format('DD/MM/YYYY') + ';' + moment().format('hh:mm:ss')
    },
    updateddAt: {
        type: String,
        default: moment().format('DD/MM/YYYY') + ';' + moment().format('hh:mm:ss')
    },
    isActive: {
        default: Boolean
    }

});

// create user model
mongoose.model('usermodel', userSchema);

//export module

module.exports = mongoose.model('usermodel');