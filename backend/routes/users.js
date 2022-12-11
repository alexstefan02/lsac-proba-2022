const express = require('express')
const router = express.Router()
const User  = require('../models/user')
const bcrypt = require('bcrypt')

router.use(express.json())

router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json(err.message)
    }
})

router.post('/', async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })
        const newUser = await user.save()
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json(err.message)
    }
})

module.exports = router