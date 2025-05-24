const express = require("express")
const connectDB = require('./config/dataBase');
const app = express();
const cookieParser = require('cookie-parser')

//middlewares 
app.use(express.json()); //its a middleware for the JSON handle
app.use(cookieParser()); //its a middleware for the cookie parser (helping to reads the cookies example in fetch the Profile API)

//importing all the Routes
const userAuthRoute = require('./routes/auth')
const requestRoute = require('./routes/request')
const profileRoute = require('./routes/profile')

//using the created route
app.use('/',userAuthRoute)
app.use('/',requestRoute)
app.use('/',profileRoute)

//connecting the DB and strting the server
connectDB()
    .then(() => {
        console.log('CONNECTION STABLISH')
        app.listen(3000, () => {
            console.log("listing on the port 3000...")
        })
    }).catch((err) => {
        console.error(err)
    })


