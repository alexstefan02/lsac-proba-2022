const express = require('express')
const router = express.Router()
const User  = require('../models/user')
router.use(express.json())

module.exports = router