
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

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

//// Genereting the Token using the JWT
userSchema.methods.getJWT=async function(){
   const token =  jwt.sign({_id:this._id},"Node.js@Dev@Tinder",{expiresIn:'1d'});
   return token;
}

//validating the pwd using the brypt librery
userSchema.methods.validatePassword= async function (passwordInputByUser) {
    const hashPassword = this.password;
    const isValid = await bcrypt.compare(passwordInputByUser,hashPassword)
    return isValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;