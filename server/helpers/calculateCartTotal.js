const OfferesSchema = require("../schema/OfferesSchema")
const OrderItem = require("../schema/OrderItemSchema")

const userRepo = require("../repositories/user-repo")
const cartItemRepo = require("../repositories/cart-item-repo")
const productRepo = require("../repositories/product-repo")

const calculateCartTotal = async (userId) => {

    try {
        
        const  offersArray = await OfferesSchema.find({})
        const offers = offersArray[0]
        console.log(offers.buy_n_get_n, "here the offers")
        const cartItems = await cartItemRepo.getCartItemByUser(userId)
        console.log(cartItems, "her the car items")
        // const cart = await userRepo.getCart(userId)
        const user = await userRepo.getUser(userId)

        const cart = user.cart

        cart.appliedDiscounts = []
        cart.actualTotal = 0
        cart.discountTotal = 0

        const orders = await OrderItem.find({user: userId})
        const isElgibleforExclusiveTier =  userLifeTimeSpending() > 5000

        const findNoOfUniqueItemQuanity = (product) => {
            const uniqueQuantity = cartItems.filter((item) => item.productId === product)
            return Number(uniqueQuantity[0].quantity)
        }

        const findNoOfUniqueOrders = (product) => {
            const sameItemOrder = cartItems.filter((item) => item.productId === product)
            return sameItemOrder.length
        }

        const userLifeTimeSpending = () => {
            const total = 0
            for (let order of orders) total+= order.price
            return total
        }

        for(let item of cartItems){
            console.log("here bgg")
            item.appliedOffers = []
            item.discountPrice = item.actualprice
            console.log(offers.buy_n_get_n, item.productId, "0000")

            if(offers.buy_n_get_n.includes(item.productId)){
                console.log('@@@ HHH EEE RRRR EEE 111')
                item.appliedOffers.push("Buy-One_Get_One_Free")
            }
            else if(offers.bpd.includes(item.productId) && item.quantity >= 3) {
                item.appliedOffers.push("Bulk Purchase Discount")
                item.discountPrice = item.actualprice*(1-0.04)
            }
            else if(
                offers.ltd.item === item.productId 
                && (Date.now < offers.ltd.seasonStart && (Date.now > offers.ltd.seasonEnd))
            ){
                item.appliedOffers.push("Limited Time Discount")
                item.discountPrice = (item.discountPrice/100)*(100 - offers.ltd.discount)
            }
            else if(
                offers.sd.item == item.productId
                && findNoOfUniqueItemQuanity(offers.cd.pairedItem)>0
            ){
                item.appliedOffers.push("Seasonal Discount")
                item.discountPrice = (item.discountPrice/100)*(100 - offers.sd.discount)
            }
            else if(offers.cd.applicableItem == item.productId){

                const pairedItemQuantity = findNoOfUniqueItemQuanity(offers.cd.pairedItem)
                if(pairedItemQuantity > 0 ){
                    if (pairedItemQuantity <= item.quantity) item.discountPrice = (item.actualprice) - ((item.actualprice / (100*item.quantity))* offers.cd.discount * (item.quantity - pairedItemQuantity))
                    else item.discountPrice = (item.discountPrice) - ((item.actualprice / 100)* offers.cd.discount)
                }
                item.appliedOffers.push("Combo Discount")
            }
            else if(offers.td.item == item.productId){
                for(let applicable of offers.td.tieredDiscount){
                    if(applicable.quantity == item.quantity){
                        item.appliedOffers.push("Tiered Discount")
                        item.discountPrice = (item.discountPrice/100)*(100 - offers.sd.applicable.discount)
                    }
                }
            }

            if(orders.length>=offers.ld.count) {
                item.appliedOffers.push("Loyality Program Discount")
                item.discountPrice = (item.discountPrice/100)*(100 - offers.ld.discount)
            }

            if(findNoOfUniqueOrders(item.productId) == 1){
                item.appliedOffers.push("Personalised Offer")
                item.discountPrice = (item.discountPrice/100)*(100 - offers.po)
            }

            if(isElgibleforExclusiveTier) {
                item.appliedOffers.push("Exclusive Tier Offer")
                item.discountPrice = (item.discountPrice/100)*(100 - offers.eto)
            }

            if((item.actualprice/100)*70<(item.discountPrice)){
                item.discountPrice = (item.actualprice/100)*70
            }

            await cartItemRepo.updateCartItem(item._id, item)

            cart.actualTotal+= item.actualprice
            cart.discountTotal+= item.discountPrice
        }

        // if(cartItems.length == 5){
        //     cart.appliedDiscounts.push("Buy More Save More")
        //     cart.discountTotal = (cart.discountTotal/100)*(100 - offers.rpd)
        // }
        // else if(cartItems.length == 5){

        // }

        for(let applicable of offers.buy_m_save_m){
            if(applicable.quantity == cart.length){
                cart.appliedDiscounts.push("Buy More Save More")
                cart.discountTotal = (cart.discountTotal/100)*(100 - applicable.discount)
            }
        }

        if(cart.discountTotal > offers.cwd.total) {
            cart.discountTotal = (cart.discountTotal/100)*(100 - offers.cwd.discount)

            if(orders.length>=offers.ld.count){
                cart.appliedDiscounts.push("Comlex Loyality Discount")
                cart.discountTotal = (cart.discountTotal/100)*(100 - offers.cld)
            }

            cart.appliedDiscounts.push("Cart Wide Discount")

        }

        if(user.coupens > 0){
            cart.appliedDiscounts.push("Referal Progam Discount")
            cart.discountTotal = (cart.discountTotal/100)*(100 - offers.rpd)
            
        }
        console.log('@@@ HHH EEE RRRR EEE')
        await userRepo.updateUser(userId, {cart:cart, coupens: (user.coupens-1)})

    } catch (error) {
        
    }
}

module.exports = calculateCartTotal