const express = require('express');
const requestRoute = express.Router();
const User = require("../models/user");

//fetch all the users
requestRoute.get("/feed", async (req, res) => {
    try {
        const user = await User.find({})
        if (user.length === 0) {
            res.status(404).send("user not Found")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(404).send('something went wrong')
    }
})

module.exports = requestRoute;
