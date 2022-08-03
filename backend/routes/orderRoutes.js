const express = require('express');
const router = express.Router();
const {createNewOrderController, getOrderByIdController} = require('../controllers/orderController.js');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

router.post('/new', isAuthenticUser, createNewOrderController);
router.get('/view', isAuthenticUser, getOrderByIdController)

module.exports = router;