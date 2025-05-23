const express = require("express")
const connectDB = require('./config/dataBase');
const User = require("./models/user");
const app = express();
const bcrypt = require('bcrypt')
const {validateTheSignUpData} = require('./utils/validation')

//moiddleware for the JSON handle 
app.use(express.json()); //its a middleware

//post api signup
//API for create the user
app.post('/signup', async (req, res) => {
    const {firstName,lastName,email, password,age,skills,gender} = req.body;
    try {
        validateTheSignUpData(req.body);//validator uisng the api validator
        const hashPassword = await bcrypt.hash(req.body.password, 10); //encripting the function
        const user = new User({firstName,lastName,email, password:hashPassword,age,skills,gender}) // created instance
        //adding the user to the DB
        const responce = await user.save();
        //sending the res to user
        res.send(`${responce.firstName} ${responce.lastName} signup succsessfuly`)

    } catch (err) {
        //catching all errors
            const errorData = err.message ? err.message : err;
            res.send("Error:"+ errorData)
    }

})

//Login API
app.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error("invalid creadential")
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(isValidPassword){
        res.cookie("token",'asdfasdfasdfasdfasdf')//set cookies
        res.send('login succsess')
    }else{
        throw new Error("invalid creadential")
    }
    }catch (err) {
        //catching all errors
            const errorData = err.message ? err.message : err;
            res.send("Error:"+ errorData)
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
app.patch('/user/:userId',async (req,res)=>{
    const userId = req.params.userId
    const data = req.body
    const UPDATE_ALLOWED= ['skill','password','age','firstName','lastName']
    const invalidKeys = Object.keys(data).filter(k => !UPDATE_ALLOWED.includes(k));
    try{
        if(invalidKeys.length==0){
            const updatedUser = await User.findByIdAndUpdate(userId,data,{'returnDocument':'after'})
            res.send(updatedUser)
        }else{
             res.status(400).send(`${invalidKeys.join()} are not allow to update`)
        }
        throw new Error("error ")
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


