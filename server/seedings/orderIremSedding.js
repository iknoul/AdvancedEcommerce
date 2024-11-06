const OrderItem = require("../schema/OrderItemSchema")

const orders = [
    {uniqueKey: "PF1", name: "Cool Water", price: 28, productId: "672a1262b90ff8aa74699858", user: "67288267ef30e9b929d7f3a5", quantity:2},
    {uniqueKey: "PF2", name: "Lataffa", price: 72, productId: "672a1242dbaca1f5978a91fe", user: "67288267ef30e9b929d7f3a5", quantity:3},
    {uniqueKey: "PF3", name: "Ck", price: 60, productId: "672a1242dbaca1f5978a91fe", user: "67288267ef30e9b929d7f3a5", quantity:4},
]

const createOrders = async () => {

    for(let item of orders){
        try {
            console.log(item, "item")
            await OrderItem.create(item)
            console.log("created success")
        } catch (error) {
            console.log("error")
        }
    }
}

createOrders()