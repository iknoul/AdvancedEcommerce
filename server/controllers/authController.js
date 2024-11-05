const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {checkUserAndPassword, createUser} = require('../repositories/user-repo')

const signUp = async (req, res) => {
    const body = req.body

    if(!body.mobile || !body.password || !body.name )  res.status(501).json('bad request')

    try {
        const salt = await bcrypt.genSalt(10)

        body.password = await bcrypt.hash(body.password, salt)

        await createUser(body)
        res.status(200).json("user created succesfully")

    } catch (error) {
        console.log(error)
        res.status(303).json('error in creating user')
    }

}

const login = async (req, res) => {
    const {mobile, password} = req.body
    if(!mobile || !password) res.status(501).json("bad request")

    const userId = await checkUserAndPassword(mobile, password)
    if (userId) {

        const loginToken = await jwt.sign({userId: userId}, process.env.JWT_SECRET_KEY, {expiresIn:'1d'})

        res.status(200).json({message:"success", token: loginToken, userId: userId})

    } else res.status(504).json("you are not authenticated")
}

module.exports = {
    signUp,
    login
}