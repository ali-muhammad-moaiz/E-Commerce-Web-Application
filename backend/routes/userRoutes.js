const express = require('express');
const router = express.Router();
const {registerUserController, loginUserController, logoutUserController, forgetPassword, getAllUserController, deleteUserController, updateUserDetailController, changePasswordController} = require('../controllers/userController');
const {isAuthenticUser} = require('../middlewares/auth.js');

router.post('/register', registerUserController);    
router.delete('/:id', isAuthenticUser, deleteUserController);                                                      
router.get('/', getAllUserController);                                                 
router.post('/forget', forgetPassword);                                                             
router.put('/update/:id', isAuthenticUser, updateUserDetailController);                                                        
router.post('/login', loginUserController);
router.get('/logout', isAuthenticUser, logoutUserController);
router.put('/updatePassword/:token', changePasswordController);

module.exports = router;