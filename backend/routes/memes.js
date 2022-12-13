const express = require('express')
const router = express.Router()
const Meme  = require('../models/meme')
router.use(express.json())

const errorLongDescription = {description: ["the field has over 2500 characters"]}

//getting all
router.get('/', async (req, res) => {
    try{
        const memes = await Meme.find()
        res.json(memes)
    }catch(err){
        res.status(500).json(err.message)
    }
})
//getting one
router.get('/:id', getMeme, (req,res) => {
    res.send(res.meme)
})
//creating one
router.post('/', async (req,res) => {
    const meme = new Meme({
        description: req.body.description
    })
    if(meme.description.length > 2500)
        return res.status(401).json(errorLongDescription)
    try{
        const newMeme = await meme.save()
        res.status(201).json(newMeme)
    }catch(err){
        res.status(400).json(err.message)
    }
})
//updating one
router.patch('/:id', getMeme, async (req,res) => {
    if(req.body.description != null){
        if(req.body.description.length > 2500)
            return res.status(401).json(errorLongDescription)
        res.meme.description = req.body.description
    }
    try{
        const updatedMeme = await res.meme.save()
        res.json(updatedMeme)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
//deleting one
router.delete('/:id', getMeme, async (req,res) => {
    try{
        await res.meme.remove()
        res.json({message: 'Deleted meme'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getMeme(req, res, next) {
    let meme
    try {
        meme = await Meme.findById(req.params.id)
        if(meme == null){
            return res.status(404).json('Cannot find meme')
        }
    }catch(err){
        return res.status(500).json({message: 'Cannot find meme'})
    }
    res.meme = meme
    next()
}

module.exports = router