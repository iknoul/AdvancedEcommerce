const userRepo = require("../repositories/user-repo")
const cartItemRepo = require("../repositories/cart-item-repo")
const productRepo = require("../repositories/product-repo")

const calculateCartTotal = require("../helpers/calculateCartTotal")

const getCart = async(req, res) => {

    const {userId} = req.body

    if(!userId) return res.status(301).send("error fetching cart details")
    
    try {
        const cart = await userRepo.getCart(userId)
        res.status(200).json(cart)
    } catch (error) {
        
    }  
}

const getCartItems = async(req, res) => {

    const {userId} = req.body

    if(!userId) return res.status(301).send("error fetching cart details")
    
    try {
        const cartItems = await cartItemRepo.getCartItemByUser(userId)
        res.status(200).json(cartItems)
    } catch (error) {
        
    }  
}

const addCartItem = async(req, res) => {

    // console.log("came here")

    const {userId, productId} = req.body
    let {quantity} = req.body

    if(typeof quantity != 'number') quantity = 1

    quantity = Number(quantity)

    if(!userId) return res.status(301).send("error adding cart item")

    try {
        const product = await productRepo.getProductById(productId)
        const  cartItem = await cartItemRepo.getCartItemByProductIdUserId(productId, userId)
        console.log(product, "cartitem")
        if(cartItem) cartItemRepo.updateCartItem(cartItem._id, {quantity: (cartItem.quantity+quantity), actualprice: cartItem.actualprice+product.price, discountPrice: cartItem.actualprice+product.price})
        else {
            const newCartItem = await cartItemRepo.createCartItem({...product._doc, productId:productId, quantity: 1, user: userId, actualprice: product.price, discountPrice: product.price})
            const userCart = await userRepo.getCart(userId)
            console.log('user cart', newCartItem)
            userCart.items.push(newCartItem._id)

            await userRepo.updateUser(userId, {cart:userCart})
        }      
        
        await calculateCartTotal(userId)

        res.status(200).json("added to cart succesfully")
    } catch (error) {
        console.log(error)
        res.status(504).json("internal server error")
    }
    
}

const removeCartItem = async(req, res) => {

    const {userId, productId} = req.body
    let {quantity} = req.body

    if(typeof quantity != 'number') quantity = 1
    
    try {
        const  cartItem = await cartItemRepo.getCartItemByProductIdUserId(productId, userId)

        if(cartItem) cartItemRepo.updateCartItem(cartItem._id, (cartItem.quantity - quantity))      
        

        if(cartItem.quantity<=0){
            const userCart = await userRepo.getCart(userId)
            userCart.item = userCart.filter((item)=> item != productId)
            await userRepo.updateUser(userId, {cart:userCart})
        }


        await calculateCartTotal(userId)

        res.status(200).json("removed from cart succesfully")
    } catch (error) {
        
    }
}

module.exports = {
    getCart,
    addCartItem,
    removeCartItem, 
    getCartItems
}

