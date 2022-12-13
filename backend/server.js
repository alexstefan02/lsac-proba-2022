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
    let badRegistrationError = {}, isError = false, email = req.body.email
    try{
        if(req.body.password === undefined){
            badRegistrationError.password = "is missing"
            isError = true
        }
        if(email === undefined){
            badRegistrationError.email = "is missing"
            isError = true
        }
        if(req.body.username === undefined){
            badRegistrationError.username = "is missing"
            isError = true
        }
        if(isError)
            return res.status(400).json(badRegistrationError)
        let badSyntaxError = {}, isSyntaxError = false
        const passwordLen = req.body.password.length
        const usernameLen = req.body.username.length
        if(passwordLen < 8 || passwordLen > 32){
            badSyntaxError.password = ["the field is not between 8 and 32 characters"]
            isSyntaxError = true
        }
        if(usernameLen < 8 || usernameLen > 32){
            badSyntaxError.username = ["the field is not between 8 and 32 characters"]
            isSyntaxError = true
        }
        if(!email.endsWith('@stud.acs.upb.ro')){
            badSyntaxError.email = ["the field must be a valid email ", "the field must end in @stud.acs.upb.ro"]
            isSyntaxError = true            
        }
        if(isSyntaxError)
            return res.status(401).json(badSyntaxError)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
        })
        const newUser = await user.save()
        res.status(201).json(newUser)
        allAccounts.push(newUser)
        
    }catch(err){
        res.status(400).json(err.message)
    }
})

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
      return res.status(400).json({
        message: "Wrong email or password"
    })
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