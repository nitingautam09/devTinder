
const express = require('express');
const profileRoute = express.Router();
const User = require("../models/user");
const { userAuth } = require('../middlewares/userAuth')

//get the Profile info with middleware 
profileRoute.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.data // accessing the user
        res.send(user)
    }
    catch (err) {
        //catching all errors
        const errorData = err.message ? err.message : err;
        res.send("Error:" + errorData)
    }
})

//API for fetch the single user By email without the middleware
profileRoute.get("/user", async (req, res) => {
    const userEmail = req.body.email
    try {
        const user = await User.findOne({ email: userEmail }).exec();
        if (!user) {
            res.status(404).send("user not Found")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(404).send('something went wrong')
    }
})

//update the user 
profileRoute.patch('/user/:userId', async (req, res) => {
    const userId = req.params.userId
    const data = req.body
    const UPDATE_ALLOWED = ['skills', 'password', 'age','gender','photoUrl','firstName', 'lastName']
    const invalidKeys = Object.keys(data).filter(k => !UPDATE_ALLOWED.includes(k));
    try {
        if (invalidKeys.length == 0) {
            const updatedUser = await User.findByIdAndUpdate(userId, data, { 'returnDocument': 'after' })
            res.send(updatedUser)
        } else {
            res.status(400).send(`${invalidKeys.join()} are not allow to update`)
        }
        throw new Error("error ")
    } catch (err) {
        res.status(400).send("somethings went wrong")
    }
});

//delete the data by id
profileRoute.delete('/user', async (req, res) => {
    const userID = req.body.userId;
    try {
        await User.findByIdAndDelete(userID)
        res.send('data delete sucessfuly');
    } catch (err) {
        res.status(400).send("somethings went wrong");
    }
})

module.exports = profileRoute;