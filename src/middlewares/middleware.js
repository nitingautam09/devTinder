
const express = require('express')

const app = express();
app.use('/',(err,req,res,next)=>{
   res.send('inside main')
}) 
app.use('/user',(req,res,next)=>{
    const auth = true;
    if(!auth){
        res.status(401).send("not autherise")
    }else{
        next();
    }
})

app.get('/user/allUser',(req,res)=>{
    res.send("all user fetch")
})

app.delete('/user/deleteUser/:userId',(req,res)=>{
    res.send(`user ${req.params.userId} Deleted`)
})

app.listen('3001',()=>{
    console.log("middleware file server running")
})

