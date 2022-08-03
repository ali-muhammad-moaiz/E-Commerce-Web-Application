const express = require('express');
const router = express.Router();
const {createNewOrderController} = require('../controllers/orderController.js');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

router.post('/new', isAuthenticUser, createNewOrderController)