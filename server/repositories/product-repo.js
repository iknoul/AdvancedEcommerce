const Product = require("../schema/ProductsSchema")

const createProduct = async (data) => {

    try {

        await Product.create(data)
        console.log("here also oks")
    } catch (error) {
        console.log("here problem", error)
    }
}

const getProductById = async (productId) => {
    try {
        return await Product.findById(productId)
    } catch (error) {
        
    }
}

module.exports = {
    createProduct,
    getProductById
}