const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/db');

const app = express();
dotenv.config();
db();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/', require('./routes/indexRoute'));
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${port}`);
});