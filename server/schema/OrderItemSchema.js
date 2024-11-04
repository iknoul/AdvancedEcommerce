const mongoose = require('mongoose')
const User = require('./UserSchema')


const orderItemSchema = new mongoose.Schema({
    uniqueKey: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    quantity: String 

})

const OrderItem = mongoose.model('orderItems', orderItemSchema)
module.exports = OrderItem