require("dotenv").config();
const express = require("express")
const port = process.env.PORT
const expresslayout = require("express-ejs-layouts")
const connectDB = require('./config/db')

const app = express()

// Database connection
connectDB()

app.use(express.static('public'))
//templating engine
app.use(expresslayout)
app.set('layout','./layouts/main')
app.set('view engine','ejs')
//end templating engine

app.use('/',require('./routes/main'))

app.listen(5000, ()=>{
    console.log(`the server is running on ${port}`)
})