const express = require('express');
const routes = express.Router();

const { registerAdmin } = require('../controlers/adminController');

routes.post('/adminregister',registerAdmin);

module.exports = routes;