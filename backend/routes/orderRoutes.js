const express = require('express');
const router = express.Router();
const {createNewOrderController, getOrderByIdController, getSpecificOrderController} = require('../controllers/orderController.js');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

router.post('/new', isAuthenticUser, createNewOrderController);
router.get('/view', isAuthenticUser, getOrderByIdController)
router.get('/view/:id', isAuthenticUser, getSpecificOrderController);

module.exports = router;