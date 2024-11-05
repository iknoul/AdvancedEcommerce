const express = require('express')

const userController = require('../../controllers/userController') 

const router = express.Router()

router.get('/cart', userController.getCart)
router.get('/cart-items', userController.getCartItems)
router.post('/add-cart-item', userController.addCartItem)
router.post('remove-cart-item', userController.removeCartItem)
module.exports = router