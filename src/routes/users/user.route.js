const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userAuth.controller')
const {verifyAuthToken} = require('../../middleware/verifyToken')



router.post("/login", userController.login);
module.exports = router
