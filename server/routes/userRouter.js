const express = require('express')
const router = express.Router();
const userController= require('../controller/userController')
const userAuth = require('../middleware/auth')


router.post('/register',userController.Register)
router.post('/login',userController.login)
router.get('/user-profile',userAuth.verifyToken,userController.userProfile)
router.post('/update-profile',userAuth.verifyToken,userController.updateProfile)
router.get('/getDetails',userAuth.verifyToken,userController.getDetails)

module.exports= router