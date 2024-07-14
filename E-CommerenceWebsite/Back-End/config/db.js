const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB is connected")
    }
    catch(e){
        console.log(e)
    }
}

module.exports = connectDB