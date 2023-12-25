const express = require('express');
const productController = require('../controllers/productController');
const authenticateMiddleware = require('../middlewares/authenticate');
const multipart = require('connect-multiparty');

const api = express.Router();
const path = multipart({ uploadDir: './uploads/products' });
const path_invoice = multipart({ uploadDir: './uploads/invoices' });
const path_gallery = multipart({ uploadDir: './uploads/gallery' });

api.post('/registerProductAdmin', [authenticateMiddleware.decodeToken, path], productController.registerProductAdmin);

api.get('/listProductsAdmin/:filter?', authenticateMiddleware.decodeToken, productController.listProductsAdmin);
api.get('/getProductCover/:img', productController.getProductCover);
api.get('/getProductAdmin/:id', authenticateMiddleware.decodeToken, productController.getProductAdmin);
api.get('/listActiveProductsAdmin', authenticateMiddleware.decodeToken, productController.listActiveProductsAdmin);

api.put('/updateProductAdmin/:id', [authenticateMiddleware.decodeToken, path], productController.updateProductAdmin);

api.post('/registerVarietyProduct', authenticateMiddleware.decodeToken, productController.registerVarietyProduct);
api.get('/getVarietiesProduct/:id', authenticateMiddleware.decodeToken, productController.getVarietiesProduct);
api.delete('/deleteVarietyProduct/:id', authenticateMiddleware.decodeToken, productController.deleteVarietyProduct);

api.post('/registerIncomeAdmin', [authenticateMiddleware.decodeToken, path_invoice], productController.registerIncomeAdmin);

api.post('/uploadProductImageAdmin', [authenticateMiddleware.decodeToken, path_gallery], productController.uploadProductImageAdmin);
api.get('/getProductGallery/:img', productController.getProductGallery);
api.get('/getProductGalleryAdmin/:id', authenticateMiddleware.decodeToken, productController.getProductGalleryAdmin);
api.delete('/deleteProductGalleryAdmin/:id', authenticateMiddleware.decodeToken, productController.deleteProductGalleryAdmin);

api.post('/createCategoryAdmin', authenticateMiddleware.decodeToken, productController.createCategoryAdmin);
api.get('/listCategoriesAdmin', authenticateMiddleware.decodeToken, productController.listCategoriesAdmin);
api.put('/changeProductStateAdmin/:id', authenticateMiddleware.decodeToken, productController.changeProductStateAdmin);

module.exports = api;