// init code
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const database = require('./database');
const port = process.env.PORT;

// including controller
const usercontroller = require('./controller/usercontroller');
const taskcontroller = require('./controller/taskcontroller');



// middleware
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user', usercontroller);
app.use('/api/task', taskcontroller);



// routes
app.all('/', (req, res) => {
    res.json({
        status: true,
        message: "index page route is running"
    });
});

// server start
app.listen(port, () => console.log('Server is running'));