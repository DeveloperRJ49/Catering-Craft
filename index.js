const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${port}`);
});

