const OrderItem = require("../schema/OrderItemSchema")

const getOrdersPerUser = async (userId) => {
    OrderItem.find({user: userId})
}

module.exports = {
    getOrdersPerUser
}