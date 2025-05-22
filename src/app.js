const express = require("express")
const connectDB = require('./config/dataBase');
const User = require("./models/user");
const app = express();

//post api signup
app.post('/signup',async (req,res)=>{

    //creating the new instance of the user model
    const user = new User({
        firstName:"nitin",
        lastName:"gautam",
        email:'exmaple.com',
        password:"ecamplpass"
    })
    try{
        const responce = await user.save();
        console.log('reds---',responce)
        res.send(`${responce.firstName} ${responce.lastName} signup succsessfuly`)
    }catch(err){
        res.send(`found ${err}`)
    }

})


connectDB()
.then(() => {
    console.log('CONNECTION STABLISH')
    app.listen(3000, () => {
        console.log("listing on the port 3000...")
    })
}).catch((err) => {
    console.error(err)
})


