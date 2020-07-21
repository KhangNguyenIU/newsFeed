const express = require('express')
const mongoose = require('mongoose')

const { MONGOURI }  = require('./config/keys')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const route = require('./routes/auth')
const app = express()
const cors = require('cors')
//body parser
app.use(express.json())

//connect mongo
connectDB()

require('./models/post')
require('./models/user')
app.use(require('./routes/user'))

app.use(cors({
  origin: "http://localhost:3000"
}))
//use routes
app.use(route)
app.use(require('./routes/post'))

if(process.env.NODE_ENV=="production"){
  app.use(express.static('/client/build'))
  const path = require('path')
  app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
  })
}
app.listen(PORT, ()=>{
  console.log(`App is running on port ${PORT} `);
  
})