require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const memesRouter = require('./routes/memes')
app.use('/memes', memesRouter)

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(3000, () => 
    console.log('Server has started'))