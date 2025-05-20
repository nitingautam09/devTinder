const express = require("express")

const app = express();

app.listen(3000,()=>{
    console.log("listing on the port 3000...")
})

// app.use("/",(req,res)=>{
//     res.send("request have made for home")
// })

app.get("/user",(req,res)=>{
    res.send({name:'nitin',age:'30'})
})

app.post('/user',(req,res)=>{
    // console.log("saving data to the DB")
    //saving data to the db
    res.send('data save sucessfully in DB')
})


app.delete('/user',(req,res)=>{
    res.send('delete the uer sucessfully')
})