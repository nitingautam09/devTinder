const express = require("express")

const app = express();

app.listen(3000,()=>{
    console.log("listing on the port 3000...")
})

// app.use("/",(req,res)=>{
//     res.send("request have made for home")
// })

// app.get("/user/:id",(req,res)=>{
//     // console.log(req.query)
//     console.log(req.params)
//     res.send({name:'nitin',age:'30'})
// })

// app.post('/user',(req,res)=>{
//     // console.log("saving data to the DB")
//     //saving data to the db
//     res.send('data save sucessfully in DB')
// })

// app.delete('/user',(req,res)=>{
//     res.send('delete the uer sucessfully')
// })

// app.use('/user',
//     (req,res,next)=>{
//     // 1st router handler
//     // res.send("rout")
//     console.log("inside the 1st route");
//     next();
//     },
//     (req,res,next)=>{
//     // 2nd router handler
//     console.log("inside the 2nd route")
//     res.send("rout")
//     }
// )

app.use('/test',router1,router2,router3)

function router1(req,res,next){
    console.log("first rout");
    next();
}
function router2(req,res,next){
    console.log('second rout');
    next();
}
function router3(req,res){
    console.log('3rd rout')
    res.send('in 3rd rout')
}

