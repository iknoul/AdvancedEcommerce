const mongoose = require('mongoose')

const CartItem = mongoose.Schema({
    items: [mongoose.Schema.ObjectId],
    appliedDiscounts: [String],
    bagTotal: String,
    total :String,
})

const userSchema = new mongoose.Schema({
    // _id : mongoose.Schema.ObjectId,
    mobile: String,
    password: String,
    name : {
        type: String,
        required: true,
    },
    cart : CartItem
})

const User = mongoose.model('users', userSchema)
module.exports = User