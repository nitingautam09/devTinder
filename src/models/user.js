
const mongoose = require('mongoose')
const validator = require('validator')

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
        trim: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Please enter valid Email address');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error('Please enter Strong Password');
            }
        }
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
    skills: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length <= 5;
      },
      message: 'You can only add up to 5 skills.'
    }
  }
}

const userSchema = new mongoose.Schema(userSchemObj,{timestamps:true})

const User = mongoose.model("User", userSchema);

module.exports = User;