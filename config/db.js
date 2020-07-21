const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')


const connectDB = async ()=>{
  const connecttion =await mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  console.log("Mongo is coonnected!");
  
}

module.exports = connectDB;