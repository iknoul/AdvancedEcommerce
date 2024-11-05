const bcrypt = require('bcrypt')

const User = require('../schema/UserSchema')

const createUser = async (userData) => {
    try {
        await User.create(userData)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (userId, userData) => {
    try {
        await User.findByIdAndUpdate(userId, userData)
    } catch (error) {
        console.log(error)
    }
}

const checkUserAndPassword = async (mobile, password) => {

    try {
        const user = await User.findOne({mobile: mobile})

        if(!user) throw new Error(`No user with ${mobile}`)
        if (await bcrypt.compare(password, user.password)) return user._id
        
    } catch (error) {
        
    }
}

const getCart = async (userId) => {

    try {
        console.log(userId, "here user id")
        const user =  await User.findById(userId)
        console.log(user.cart, 'here user')
        return user.cart

    } catch (error) {
        console.log('error here', error)
    }
}

const getUser = async (userId) => {
    try {
        return await User.findById(userId)
    } catch (error) {
        
    }
}

module.exports = {
    createUser,
    checkUserAndPassword,
    getCart,
    updateUser,
    getUser
}