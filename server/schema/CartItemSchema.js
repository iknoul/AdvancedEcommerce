const mongoose = require('mongoose')
const User = require('./UserSchema')

const cartItemSchema = new mongoose.Schema({
    uniqueKey: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    productId: mongoose.Schema.ObjectId,
    appliedOffers: [String],
    actualprice: {
        type: Number,
        required: true,
    },
    discountPrice : Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    quantity: {
        type: Number,
    } 

})

const CartItem = mongoose.model('cartItems', cartItemSchema)
module.exports = CartItem