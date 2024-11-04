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
    appliedOffers: [String],
    actualprice: {
        type: String,
        required: true,
    },
    discountPrice : String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    quantity: {
        type: String,
    } 

})

const CartItem = mongoose.model('cartItems', cartItemSchema)
module.exports = CartItem