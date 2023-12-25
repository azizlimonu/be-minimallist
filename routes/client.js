const express = require('express');
const clientController = require('../controllers/clientController');

const api = express.Router();

api.post('/registerCustomer', clientController.registerCustomer);
api.post('/loginCustomer', clientController.loginCustomer);

module.exports = api;