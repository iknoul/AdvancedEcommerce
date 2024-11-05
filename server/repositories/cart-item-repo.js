const CartItem = require("../schema/CartItemSchema")

const getCartItemByUniqueKey = async (uniqueKey) => {

    try {
        return await CartItem.find({uniqueKey:uniqueKey})
    } catch (error) {
        
    }
}

const getCartItemByProductId = async (productId) => {

    try {
        return await CartItem.find({product:productId})
    } catch (error) {
        
    }
}

const getCartItemByProductIdUserId= async (productId, userId) => {

    try {
        const o = await CartItem.findOne({productId:productId, user: userId})
        console.log(o, "here o ")
        return o
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

const updateCartItem = async (cartItemId, data) => {

    try {
        await CartItem.findByIdAndUpdate(cartItemId, data)
    } catch (error) {
        
    }
}

const createCartItem = async (cartItemData) => {
    
    try {
        console.log(cartItemData, ' here cart item data')
        const d = await CartItem.create(cartItemData)
        console.log(d, 'here d')
        return d
    } catch (error) {
        
    }
}

module.exports = {
    getCartItemByUniqueKey,
    getCartItemById,
    getCartItemByUser,
    updateCartItem,
    createCartItem,
    getCartItemByProductId,
    getCartItemByProductIdUserId
}