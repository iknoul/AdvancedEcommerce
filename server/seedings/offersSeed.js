const Offers = require("../schema/OfferesSchema")

const offer = {

    maxOnSingleItem: 30, 
    ad: 20, 
    cld: 2,
    po: 20,
    eto: 10,
    rpd: 10,
    buy_n_get_n: ['6729f5a92b4ef77b206e6a2d'],
    bpd: ['6729f5aa2b4ef77b206e6a30'],
    cd: {applicableItem: '6729f5aa2b4ef77b206e6a32', pairedItem: '6729f5a92b4ef77b206e6a2d', discount: 10},
    sd: {item: '6729f5aa2b4ef77b206e6a38', pairedItem: '6729f5aa2b4ef77b206e6a34', discount: 25},
    td: {item: '6729f5aa2b4ef77b206e6a36', discountPerQuantity: [{quantity:2, discount: 10}, {quantity:4, discount: 20}]},
    ltd: {item: '6729f5aa2b4ef77b206e6a34', seasonStart: '01/11/2024', endStart: '01/01/2025', discount: 15},
    buy_m_save_m: [{quantity: '5', discount: 10}, {quantity: '6', discount: 15}],
    ld: {count: 5, discount: 5},
    cwd: {total: 500, discount: 5}
}



const createOfferes = async () => {

        try {
            console.log(offer, "item")
            await Offers.create(offer)
            console.log("created success")
        } catch (error) {
            console.log("error")
        }
    
}

createOfferes()