const productRepo = require("../repositories/product-repo")

const products = [
    {uniqueKey: "PF1", name: "Cool Water", price: "40"},
    {uniqueKey: "PF2", name: "Lataffa", price: "80"},
    {uniqueKey: "PF3", name: "Ck", price: "50"},
    {uniqueKey: "PF4", name: "Armani", price: "120"},
    {uniqueKey: "PF5", name: "Gucci Bloom", price: "100"},
    {uniqueKey: "PF6", name: "Chanel No: 5", price: "150s"},
]

const createProducts = async () => {

    for(let item of products){
        try {
            console.log(item, "item")
            await productRepo.createProduct(item)
            console.log("created success")
        } catch (error) {
            console.log("error")
        }
    }
}

createProducts()