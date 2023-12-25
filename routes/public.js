var express = require('express');
var publicController = require('../controllers/publicController');

var api = express.Router();

api.get('/getNewProducts', publicController.getNewProducts);
api.get('/getDiscountedProducts', publicController.getDiscountedProducts);
api.get('/getShopProducts', publicController.getShopProducts);
api.get('/listShopCategories', publicController.listShopCategories);
api.get('/getProductBySlug/:slug', publicController.getProductBySlug);
api.get('/getProductByCategory/:category', publicController.getProductByCategory);

module.exports = api;