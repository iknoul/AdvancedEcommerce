const mongoose = require('mongoose')
const User = require('./UserSchema')


const orderItemSchema = new mongoose.Schema({
    uniqueKey: {
        type: String,
        required: true
    },
    produc: mongoose.Schema.ObjectId,
    name: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    quantity: Number 

})

const OrderItem = mongoose.model('orderItems', orderItemSchema)
module.exports = OrderItem