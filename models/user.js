const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  pic:{
    type:String,
    default:"https://res.cloudinary.com/dmdiv5ldu/image/upload/v1595234863/default_avatar_lqvvar.jpg"
  },
  followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})


module.exports=mongoose.model("User", userSchema)