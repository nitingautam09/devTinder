
const mongoose = require('mongoose')

const URL = 'mongodb+srv://glnitingautam:IcJjtxUM9eo5QuNP@cluster0.bktzyor.mongodb.net/devTinder'

const connectDB = async ()=>{
   await mongoose.connect(URL)
}

module.exports = connectDB;