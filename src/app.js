const express = require("express")

const app = express();

app.listen(3000,()=>{
    console.log("listing on the port 3000...")
})

app.use("/",(req,res)=>{
    res.send("request have made for home")
})

app.use("/test",(req,res)=>{
    res.send("request have made for the test")
})

app.use("/name",(req,res)=>{
    res.send("request have made for the test-2")
})

