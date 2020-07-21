const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
router.get('/protected', requireLogin,(req, res) => {
  res.send("hello")
})

router.post('/signup', async (req, res) => {
  const { name, email, password, pic} = req.body;
  if (!name || !email || !password)
    res.json({ error: " Please enter all the field!" })

  await User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser)
        return res.status(422).json({ error: "Email is already existed!" })
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            pic:pic
          })

          newUser.save()
            .then(user => {
              res.json({ msg: "Post Complete" })
            })
            .catch(err => {
              console.log(err)
            })
        })

    })
    .catch(err => {
      console.log(err);

    })
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) 
    res.json({ error: "Please input all field" })
  
  await User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) 
        return res.status(422).json({ error: "Invalid eamil or password" })
      
      bcrypt.compare(password, savedUser.password)
        .then(doMtach => {
          if (doMtach) {
            //generate token
            const token  = jwt.sign({_id:savedUser._id}, JWT_SECRET)
            const {_id, name, email,followers, following, pic} = savedUser
            res.json({token,user:{_id, name, email, followers, following, pic}})
          } else {
            return res.status(422).json({error: "Invalid password" })
          }
        })
        .catch(err => {
          console.log(err);
        })
    })
})

module.exports = router
