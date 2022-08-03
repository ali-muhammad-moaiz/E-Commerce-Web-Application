const express = require('express');
const router = express.Router();
const {createNewOrderController, deleteOrderController, getOrderByIdController, getSpecificOrderController, addProductToOrderController, removeProductFromOrderController} = require('../controllers/orderController.js');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

router.post('/new', isAuthenticUser, createNewOrderController);
router.get('/view', isAuthenticUser, getOrderByIdController)
router.get('/view/:id', isAuthenticUser, getSpecificOrderController);
router.put('/update/add/:id', isAuthenticUser, addProductToOrderController);
router.put('/update/remove/:id', isAuthenticUser, removeProductFromOrderController);
router.delete('/:id', isAuthenticUser, authorizeRoles("admin"), deleteOrderController);

module.exports = router;