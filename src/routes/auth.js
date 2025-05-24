const express = require('express')
const userAuthRoute = express.Router();
const User = require("../models/user");
const { validateTheSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt')


//Login API
userAuthRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("invalid creadential")
        }
        const isValidPassword = await user.validatePassword(password) // created schema method for validate passeord
        if (isValidPassword) {
            const token = await user.getJWT(); // Genereting the Token using the JWT
            res.cookie("token",token) // setting up  cookies
            res.send('login succsess') 
        } else {
            throw new Error("invalid creadential")
        }
    } catch (err) {
        //catching all errors
        const errorData = err.message ? err.message : err;
        res.send("Error:" + errorData)
    }
});

//post api signup
//API for create the user
userAuthRoute.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, age, skills, gender } = req.body;
    try {
        validateTheSignUpData(req.body);//validator uisng the api validator
        const hashPassword = await bcrypt.hash(password, 10); //encripting the function
        const user = new User({ firstName, lastName, email, password: hashPassword, age, skills, gender }) // created instance
        //adding the user to the DB
        const responce = await user.save();
        //sending the res to user
        res.send(`${responce.firstName} ${responce.lastName} signup succsessfuly`)

    } catch (err) {
        //catching all errors
        const errorData = err.message ? err.message : err;
        res.send("Error:" + errorData)
    }
});

//LogOut

userAuthRoute.post('/logout', async(req,res)=>{
    res.cookie("token",null,{expire:new Date(Date.now())}) // deleting up the cookies
    res.send("log Out success")

})

module.exports=userAuthRoute;