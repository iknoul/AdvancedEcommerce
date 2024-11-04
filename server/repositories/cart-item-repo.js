const CartItem = require("../schema/CartItemSchema")

const getCartItemByUniqueKey = async (uniqueKey) => {

    try {
        return await CartItem.find({uniqueKey:uniqueKey})
    } catch (error) {
        
    }
}

const getCartItemById = async (cartItemID) => {
    
    try {
        return await CartItem.findById(cartItemID)
    } catch (error) {
        
    }
}

const getCartItemByUser = async (userId) => {
    try {
        return await CartItem.find({user:userId})
    } catch (error) {
        
    }
}

const updateCartItem = async (data) => {

    try {
        await CartItem.findByIdAndUpdate(data._id,data)
    } catch (error) {
        
    }
}

const createCartItem = async (cartItemData) => {
    
    try {
        await CartItem.create(cartItemData)
    } catch (error) {
        
    }
}

module.exports = {
    getCartItemByUniqueKey,
    getCartItemById,
    getCartItemByUser,
    updateCartItem,
    createCartItem
}