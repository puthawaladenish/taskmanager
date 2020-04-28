// init code
const mongoose = require('mongoose');
const assert = require('assert');
const db_url = process.env.DB_URL
    // connection start code

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => console.log('Database is connection OK'));