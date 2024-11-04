const express = require('express')

const authController = require('../../controllers/authController') 

const router = express.Router()

router.post('/sign-in', authController.signUp)
router.post('/login', authController.login)

module.exports = router