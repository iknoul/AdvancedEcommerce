const express = require('express')

const checkToken = require("../middlewares/checkToken")

const auth_routes = require('./auth-routes/index')
const user_routes = require('./user-routes')

const router = express.Router()

router.use('/auth',auth_routes)
// router.use('/user', checkToken, user_routes)

module.exports =  router