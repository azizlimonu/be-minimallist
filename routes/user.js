const express = require('express');
const userController = require('../controllers/userController');
const authenticateMiddleware = require('../middlewares/authenticate');

const api = express.Router();

api.post('/registerAdminUser', authenticateMiddleware.decodeToken, userController.registerAdminUser);
api.post('/loginUser', userController.loginUser);

api.get('/listAdminUsers/:filter?', authenticateMiddleware.decodeToken, userController.listAdminUsers);
api.get('/getAdminUser/:id', authenticateMiddleware.decodeToken, userController.getAdminUser);

api.put('/updateAdminUser/:id', authenticateMiddleware.decodeToken, userController.updateAdminUser);
api.put('/changeAdminUserState/:id', authenticateMiddleware.decodeToken, userController.changeAdminUserState);

module.exports = api;