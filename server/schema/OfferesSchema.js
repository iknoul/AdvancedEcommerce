const mongoose = require('mongoose')

const cartWideDiscount = new mongoose.Schema({
    total: Number,
    discount: Number,
})

const loyalityProgramDiscount = new mongoose.Schema({
    count: Number,
    discount: Number,
})

const buyMoreSaveMoreQuantityToDiscount = new mongoose.Schema({
    quantity: Number,
    discount: Number,
})

// const buyMoreSaveMore = new mongoose.Schema({
//     quantityAndDiscount: [buyMoreSaveMoreQuantityToDiscount]
// })

const limitedTimeDiscount = new mongoose.Schema({
    item: mongoose.Schema.ObjectId,
    seasonStart: Date,
    seasonEnd: Date,
    discount: Number,
})

const sesonalDiscount = new mongoose.Schema({
    item: mongoose.Schema.ObjectId,
    pairedItem: mongoose.Schema.ObjectId,
    discount: Number,
})

const tieredQuantityDiscountPairs = new mongoose.Schema({
    quantity : Number,
    discount : Number,
})

const comboDiscount = new mongoose.Schema({
    applicableItem: mongoose.Schema.ObjectId,
    pairedItem: mongoose.Schema.ObjectId,
    discount: Number,
})

const tieredDiscount = new mongoose.Schema({
    item: mongoose.Schema.ObjectId,
    discountPerQuantity: [tieredQuantityDiscountPairs],
})

const offersSchema = new mongoose.Schema({

    // max discount that can apply on on single cart item
    maxOnSingleItem: Number,

    // annivercary discount
    ad: Number,

    // complex loyality discount
    cld: Number,

    // personalized offer (when buying unique item second th time)
    po: Number,

    // exclusive tier offer
    eto: Number,

    // referral program discount
    rpd: Number,

    // buy one get one
    buy_n_get_n: {
        // contains the array of productId
        type: [mongoose.Schema.ObjectId],
    },
    // bulk purchase discount
    bpd: {
        // contains the array of productId
        type: [mongoose.Schema.ObjectId],
    },
    // combo discount
    cd: {
        // contains the array of productId
        type: comboDiscount,
    },
    // seasonal discount
    sd: {
        // contains the array of productId
        type: sesonalDiscount,
    },
    // tiered discount
    td: {
        type: tieredDiscount
    },
    // limited time discount
    ltd: {
        type: limitedTimeDiscount
    },
    // buy more save more
    buy_m_save_m: [buyMoreSaveMoreQuantityToDiscount],
    // loyality program discount
    ld: loyalityProgramDiscount,
    // cart wide discount
    cwd: cartWideDiscount,
    // quantity: String 

})

const Offers = mongoose.model('offers', offersSchema)
module.exports = Offers