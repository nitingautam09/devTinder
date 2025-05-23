const express = require("express")
const connectDB = require('./config/dataBase');
const User = require("./models/user");
const app = express();

//moiddleware for the JSON handle 
app.use(express.json()); //its a middleware


//post api signup

//API for create the user
app.post('/signup', async (req, res) => {

    const user = new User(req.body)
    try {
        const responce = await user.save();
        res.send(`${responce.firstName} ${responce.lastName} signup succsessfuly`)
    } catch (err) {
        if(err.code==11000){
            res.send('Email already registered. Please use a different email.')
        }else{

            res.send(err)
        }
    }

})

//API for fetch the single user By email
app.get("/user", async (req, res) => {
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

//fetch all the users
app.get("/feed", async (req, res) => {  
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

//update the user 
app.patch('/user',async (req,res)=>{
    const userId = req.body.userId
    const data = req.body
    try{
        const updatedUser = await User.findByIdAndUpdate(userId,data,{'returnDocument':'after'})
            res.send(updatedUser)
    }catch(err){
        res.status(400).send("somethings went wrong")
    }
})

//delete the data by id
app.delete('/user', async(req,res)=>{
    const userID = req.body.userId;
    try{
        await User.findByIdAndDelete(userID)
        res.send('data delete sucessfuly');
    }catch(err){
         res.status(400).send("somethings went wrong");
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


