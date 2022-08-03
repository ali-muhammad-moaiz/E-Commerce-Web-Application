const express = require('express');
const router = express.Router();
const {createNewOrderController, getOrderByIdController, getSpecificOrderController, addProductToOrderController, removeProductFromOrderController} = require('../controllers/orderController.js');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

router.post('/new', isAuthenticUser, createNewOrderController);
router.put('/update/add/:id', isAuthenticUser, addProductToOrderController);
router.put('/update/remove/:id', isAuthenticUser, removeProductFromOrderController);
router.get('/view', isAuthenticUser, getOrderByIdController)
router.get('/view/:id', isAuthenticUser, getSpecificOrderController);

module.exports = router;