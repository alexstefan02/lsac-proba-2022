const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Meme', memeSchema)