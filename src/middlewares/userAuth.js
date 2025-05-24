const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            throw new Error("please log in")
        }
        const decoded = await jwt.verify(token, "Node.js@Dev@Tinder");
        const {_id} = decoded
        const user = await User.findById(_id);
        if(!user){
            throw new Error("please log in");
        }
        req.data=user;
        next();
    } catch (err) {
        //catching all errors
        const errorData = err.message ? err.message : err;
        res.send("Error:" + errorData)
    }
}

module.exports = {userAuth}