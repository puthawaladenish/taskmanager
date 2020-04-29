// init code
require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const database = require('./database');
const port = process.env.PORT;

// middleware
app.use(morgan('dev'));
app.use(cors());

// routes
app.all('/', (req, res) => {
    res.json({
        status: true,
        message: "index page route is running"
    });
});

// server start
app.listen(port, () => console.log('Server is running'));