const userRepo = require("../repositories/user-repo")
const cartItemRepo = require("../repositories/cart-item-repo")
const productRepo = require("../repositories/product-repo")
const orderItemRepo = require("../repositories/order-item-repo")

const getCart = async(req, res) => {

    const {userId} = req.body

    if(!userId) return res.status(301).send("error fetching cart details")
    
    try {
        const cart = await userRepo.getCart(userId)
        res.status(200).json(cart)
    } catch (error) {
        
    }  
}

const addCartItem = async(req, res) => {


    const speceficDates = {startDate: new Date('01/02/2025'), endDate: new Date('01/03/2025')}

    const {userId, productId, quantity} = req.body

    if(!userId) return res.status(301).send("error adding cart item")
    
    const cartItemToUpdate = []

    let cartTotal = 0
    let discountCartTotal = 0

    try {

        const user = await userRepo.getCart(userId)
        const product = await productRepo.getProductById(productId)
        const cartItems = await cartItemRepo.getCartItemByUser(userId)
        const userOrders = await orderItemRepo.getOrdersPerUser(userId)

        let cartItem = await cartItemRepo.getCartItemByUniqueKey(product.uniqueKey)

        if(cartItem) {
            cartItem.actualprice+= cartItem.actualprice/cartItem.quantity
            cartItem.discountPrice = cartItem.actualprice
            cartItem.quantity+= 1
        }
        else cartItem = await cartItemRepo.createCartItem({...product, quantity: 1, user: userId, actualprice: product.price, discountPrice: product.price})      

        const PfTwoItem = cartItems.filter((item) => {item.uniqueKey === "PF2"})
        const PfThreeItem = cartItems.filter((item) => item.uniqueKey === "PF3")
        const PfOneItem = cartItems.filter((item) => item.uniqueKey === "PF1")
        const PfFourItem = cartItems.filter((item) => item.uniqueKey === "PF4")
        const PfSixItem = cartItems.filter((item) => item.uniqueKey === "PF6")
        const PfFiveItem = cartItems.filter((item) => item.uniqueKey === "PF5")

        cartItemToUpdate.push(PfTwoItem)
        cartItemToUpdate.push(PfThreeItem)
        cartItemToUpdate.push(PfOneItem)
        cartItemToUpdate.push(PfFourItem)
        cartItemToUpdate.push(PfSixItem)
        cartItemToUpdate.push(PfFiveItem)



        if(product.uniqueKey === "PF1") {
            cartItem.appliedOffers.push("Buy-One_Get_One_Free")

            // if this get one consider as the buyin quantity
            // cartItem.quantity+= 1
            // cartItem.discountPrice = 20
        }

        if(PfTwoItem.quantity >= 3) {
            cartItem.appliedOffers.push("Bulk Purchase Discount")
            cartItem.discountPrice = 75
        }

        if(product.uniqueKey === "PF1" || product.uniqueKey === "PF3"){
            if((PfThreeItem.quantity - PfOneItem.quantity>0) && product.uniqueKey === "PF3"){
                cartItem.discountPrice = cartItem.actualprice -  ((PfThreeItem.quantity - PfOneItem.quantity)*10)
                cartItem.appliedOffers.push("Combo Discount")
            }
            else {
                PfThreeItem.discountPrice = PfThreeItem.actualprice -  ((PfThreeItem.quantity - PfOneItem.quantity)*10)
                PfThreeItem.appliedOffers.push("Combo Discount")
            }
        }

        if(Date.now > speceficDates.startDate && Date.now < speceficDates.endtDate && cartItem.uniqueKey === "PF4"){
            if(cartItem.quantity ) cartItem.discountPrice = cartItem.actualprice - ((cartItem.actualprice/100)*15)
            cartItem.appliedOffers.push("Limited Time Discount")
            
        }
        
        if(product.uniqueKey === "PF5" ){
            if(cartItem.quantity >= 4) {
                cartItem.discountPrice = cartItem.actualprice - ((cartItem.actualprice/100)*20)
                cartItem.appliedOffers.push("Tiered Discount for Gucci Bloom")

            }
            else if(cartItem.quantity >= 2) {
                cartItem.discountPrice = cartItem.actualprice - ((cartItem.actualprice/100)*10)
                cartItem.appliedOffers.push("Tiered Discount for Gucci Bloom")

            }
        }

        if(Date.now > speceficDates.startDate && Date.now < speceficDates.endtDate && ((cartItem.uniqueKey === "PF6" && PfFourItem) || (cartItem.uniqueKey === "PF4" && PfSixItem))){
            if(cartItem.uniqueKey === "PF6" ) {
                cartItem.discountPrice = cartItem.actualprice - ((cartItem.actualprice/100)*25)
                cartItem.appliedOffers.push("Seasonal Discount on Chanel No 5")
            }
            else {
                PfSixItem.discountPrice = PfSixItem.actualprice -  ((PfSixItem.actualprice/100)*25)
                PfSixItem.appliedOffers.push("Seasonal Discount on Chanel No 5")
            }    
        }
        
        const applyFivePercetDis = () => {
            PfTwoItem.discountPrice = (PfTwoItem.discountPrice - (PfTwoItem.discountPrice/100)*5)
            PfThreeItem.discountPrice = (PfThreeItem.discountPrice - (PfThreeItem.discountPrice/100)*5)
            PfOneItem.discountPrice = (PfOneItem.discountPrice - (PfOneItem.discountPrice/100)*5)
            PfFourItem.discountPrice = (PfFourItem.discountPrice - (PfFourItem.discountPrice/100)*5)
            PfSixItem.discountPrice = (PfSixItem.discountPrice - (PfSixItem.discountPrice/100)*5)
            PfFiveItem.discountPrice = (PfFiveItem.discountPrice - (PfFiveItem.discountPrice/100)*5)
            cartItem.discountPrice  = (PfTwoItem.discountPrice - (PfTwoItem.discountPrice/100)*5)
        }

        const addCartTotal = () => {
          
            cartTotal+=  cartItemToUpdate.map((item) => {
                if(cartItem.uniqueKey != item.uniqueKey){
                    return item.discountPrice
                }
            })
            cartTotal+= cartItemtem.discountPrice
        }

        if(userOrders.length>=5) applyFivePercetDis()
        
        addCartTotal()

        if(cartTotal > 500){
            discountCartTotal = cartTotal - ((cartTotal/100)*5)
            if(userOrders.length>=5)  discountCartTotal = discountCartTotal - ((discountCartTotal/100)*2)
        }


        // if(Date.now().g)
    

        // if(cartItems.length = 5) 
        // else if(cartItems.length = 6)

        for(let item of cartItemToUpdate){
            await cartItemRepo.updateCartItem(item)
        }

        const itemId = cartItemToUpdate.reduce((item)=> item._id)

        await userRepo.updateUser(userId, { [cart.item]:itemId})
        
    } catch (error) {
        
    }
    
}
module.exports = {
    getCart,
    addCartItem,
}

