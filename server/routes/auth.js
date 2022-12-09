const express = require('express')
const { register, logIn } = require('../controllers/auth')

const router = express.Router()

router.post('/auth/register', register)
router.post('/auth/login', logIn)


module.exports = router