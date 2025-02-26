const express = require('express');

const routes = express.Router();

routes.use('/admin',require('./adminRoute'));

module.exports = routes;