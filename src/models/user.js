
const mongoose = require('mongoose')

const userSchemObj = {
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25,
        trim: true
    },
    lastName: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 25,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        lowercase: true,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value)) {
                throw new Error('add valid gender')
            }
        }
    },
}

const userSchema = new mongoose.Schema(userSchemObj,{timestamps:true})

const User = mongoose.model("User", userSchema);

module.exports = User;