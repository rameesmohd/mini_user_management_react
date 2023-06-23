const express = require('express')
const router = express.Router();
const adminController = require('../controller/adminController');
const { verifyToken } = require('../middleware/auth');

router.post('/admin_login',adminController.adminLogin)
router.get("/getUsers", verifyToken, adminController.getUser);
router.get("/user_edit", verifyToken, adminController.userEdit);
router.post("/update_user", verifyToken, adminController.updateUser);
router.post("/delete_user", verifyToken, adminController.deleteUser);


module.exports= router