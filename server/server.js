const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// const seed = require("./seedings/productSeeding")
// const createOfferes = require("./seedings/offersSeed")
// const orderIremSedding = require("./seedings/orderIremSedding")

require('./config/db')

const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static('images'))

app.use(routes)

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started succesfully on ${process.env.SERVER_PORT} ...`)
})
