const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    uniqueKey: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true,
    }
})

const Producut = mongoose.model('products', productSchema)
module.exports = Producut