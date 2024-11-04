const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

console.log(process.env.MONGODB_URL)
const mongoose  = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('database conncected succesfully ...'))
    .catch(() => {console.log("can't connect to database ...")})
