require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');
const User  = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
let allAccounts = [];

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const memesRouter = require('./routes/memes')
app.use('/memes', memesRouter)


app.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
        allAccounts = users
    }catch(err){
        res.status(500).json(err.message)
    }
})

app.post('/register', async (req,res) => {
    let badRegistrationError = {}, isError = false
    try{
        if(req.body.password === undefined){
            badRegistrationError.password = "is missing"
            isError = true
        }
        if(req.body.email === undefined){
            badRegistrationError.email = "is missing"
            isError = true
        }
        if(req.body.username === undefined){
            badRegistrationError.username = "is missing"
            isError = true
        }
        if(isError)
            res.status(400).json(badRegistrationError)
        else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword
            })
            const newUser = await user.save()
            res.status(201).json(newUser)
            allAccounts.push(newUser)
        }
    }catch(err){
        res.status(400).json(err.message)
    }
})

// app.post('/login', async (req,res) => {
//     let badAuthentificationError = {}, isError = false
//     if(req.body.email === undefined){
//         badAuthentificationError.email = "is required"
//         isError = true
//     }
//     if(req.body.password === undefined){
//         badAuthentificationError.password = "is required"
//         isError = true
//     }
//     if(isError)
//         return res.status(400).json(badAuthentificationError)
//     const user = allAccounts.find(user => user.email === req.body.email)
//     if(user == null){
//         return res.status(400).json({
//             message: "Wrong email or password"
//         })
//     }
//     try{
//         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//         if(await bcrypt.compare(req.body.password, user.password)) {
//             res.send('Success')
//         }else{
//             return res.status(400).json({
//                 message: "Wrong email or password"
//             })
//         }
//     }catch{
//         res.status(500).send()
//     }
// })

app.post('/login', async (req, res) => {
    const user = allAccounts.find(user => user.email === req.body.email)
    let badAuthentificationError = {}, isError = false
    if(req.body.email === undefined){
        badAuthentificationError.email = "is required"
        isError = true
    }
    if(req.body.password === undefined){
        badAuthentificationError.password = "is required"
        isError = true
    }
    if(isError)
        return res.status(400).json(badAuthentificationError)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
            res.json({token : accessToken})
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
  })

app.listen(3000, () => 
    console.log('Server has started'))