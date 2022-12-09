const express = require('express')
const { getUser, getUsersFriend, addRemoveFriends } = require('../controllers/users')
const { hasAuthorization } = require('../middleware/auth')

const router = express.Router()

router.get('/user/:id', hasAuthorization, getUser)
router.get('/user/:id', hasAuthorization, getUsersFriend)

router.put('/user/:id', hasAuthorization, addRemoveFriends)


module.exports = router