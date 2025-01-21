require("dotenv").config();
const express = require("express")
const port = process.env.PORT
const expresslayout = require("express-ejs-layouts")
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const mongoStore = require('connect-mongo');
const session = require("express-session");
const methodOverride = require('method-override')

const app = express()

// Database connection
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    store:mongoStore.create({
        mongoUrl:process.env.MONGODB_URL
    })
}))
//cookie:{maxAge: new Date (Date.now()+ (3600000))}

app.use(express.static('public'))
//templating engine
app.use(expresslayout)
app.set('layout','./layouts/main')
app.set('view engine','ejs')
//end templating engine

app.use('/',require('./routes/main'))
app.use('/',require('./routes/admin'))

app.listen(5000, ()=>{
    console.log(`the server is running on ${port}`)
})