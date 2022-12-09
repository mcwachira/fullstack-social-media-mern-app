const express = require('express')

const {
    getFeedPost,
    getUserPosts,
    likePosts

} = require('../controllers/posts')
const { hasAuthorization } = require('../middleware/auth')


const router = express.Router()


router.get('/', hasAuthorization, getFeedPost)
router.get('/:id/posts', hasAuthorization, getUserPosts)

//update the post
router.get('/:id/like', hasAuthorization, likePosts)
module.exports = router