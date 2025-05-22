
const express = require('express')
const app = express();


app.use("/user",(req,res,next)=>{
    res.send('inside the user fetch')
})

app.use("/allUsers",(req,res,next)=>{
    res.send('inside the user fetch')
})


app.listen("7777",()=>{
    console.log("runnig on the port 7777.....")
})