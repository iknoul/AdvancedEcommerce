const Offers = require("../schema/OfferesSchema")

const offer = {

    maxOnSingleItem: 30, 
    ad: 20, 
    cld: 2,
    po: 20,
    eto: 10,
    rpd: 10,
    buy_n_get_n: ['672a1241dbaca1f5978a91f5'],
    bpd: ['672a1242dbaca1f5978a91f8'],
    cd: {applicableItem: '672a1242dbaca1f5978a91fa', pairedItem: '672a1241dbaca1f5978a91f5', discount: 10},
    sd: {item: '672a1262b90ff8aa74699858', pairedItem: '672a1242dbaca1f5978a91fc', discount: 25},
    td: {item: '672a1242dbaca1f5978a91fe', discountPerQuantity: [{quantity:2, discount: 10}, {quantity:4, discount: 20}]},
    ltd: {item: '672a1242dbaca1f5978a91fc', seasonStart: '01/11/2024', endStart: '01/01/2025', discount: 15},
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