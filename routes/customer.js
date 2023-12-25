const express = require('express');
const customerController = require('../controllers/customerController');
const authenticateMiddleware = require('../middlewares/authenticate');

const api = express.Router();

api.post('/createProductInCart', authenticateMiddleware.decodeToken, customerController.createProductInCart);
api.get('/getCustomerCart', authenticateMiddleware.decodeToken, customerController.getCustomerCart);
api.delete('/removeProductFromCart/:id', authenticateMiddleware.decodeToken, customerController.removeProductFromCart);
api.post('/createCustomerAddress', authenticateMiddleware.decodeToken, customerController.createCustomerAddress);
api.get('/getCustomerAddresses', authenticateMiddleware.decodeToken, customerController.getCustomerAddresses);
api.delete('/removeCustomerAddress/:id', authenticateMiddleware.decodeToken, customerController.removeCustomerAddress);

module.exports = api;