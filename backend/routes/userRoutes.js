const express = require('express');
const router = express.Router();
const {registerUserController, loginUserController, totalSellingController, deleteProfileController, updateUserRoleController, getPersonalDetailsController, updateUserPasswordController, logoutUserController, forgetPassword, getAllUserController, deleteUserController, updateUserProfileController, changePasswordController} = require('../controllers/userController');
const {isAuthenticUser, authorizeRoles} = require('../middlewares/auth.js');

router.post('/register', registerUserController);  
router.post('/forget', forgetPassword);    
router.post('/login', loginUserController);
router.get('/logout', isAuthenticUser, logoutUserController);
router.get('/orders', isAuthenticUser, authorizeRoles("admin"), totalSellingController)
router.get('/profile/info', isAuthenticUser, getPersonalDetailsController);
router.get('/', isAuthenticUser, authorizeRoles("admin"), getAllUserController);
router.put('/profile/update', isAuthenticUser, updateUserProfileController);
router.put('/forget/password/update/:token', changePasswordController);
router.put('/password/update', isAuthenticUser, updateUserPasswordController);   
router.put('/update/role/:id', isAuthenticUser, authorizeRoles("admin"), updateUserRoleController);
router.delete('/profile/delete', isAuthenticUser, deleteProfileController);
router.delete('/:id', isAuthenticUser, authorizeRoles("admin"), deleteUserController);

module.exports = router;