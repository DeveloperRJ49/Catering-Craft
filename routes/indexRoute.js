const express = require('express');

const routes = express.Router();

routes.get('/admin',require('./adminRoute'));

module.exports = routes;