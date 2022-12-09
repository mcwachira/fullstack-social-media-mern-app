import User from '../models/User';

const Post = require('../models/Post')



//create a post

const createPost = async (req, res) => {
    const { userId, description, picturePath } = req.body;
    try {
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        //gets all the post from the database

        //we can either return the newly created post all all the posts
        const post = await Post.find()

        //for now I will return the newly created posts

        res.status(201).json(newPost)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


//fetch all the post 
const getFeedPost = async (req, res) => {


    try {
        const post = await Post.find()

        res.status(201).json(post)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//fetch post based on the user id 
const getUserPosts = async (req, res) => {

    //get user id from params
    const { userId } = req.params

    try {
        const posts = await Post.find({ userId })

        res.status(201).json(post)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


//updating post based on the number of likes
const likePosts = async (req, res) => {

    const { id } = req.params;

    //get user id from body
    const { userId } = req.body

    try {

        //get the post based on the id in the query string

        const post = await Post.findById(id)

        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                likes: post.likes
            },
            {
                new: true
            }
        )

        res.status(200).json(updatedPost)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


module.exports = {
    getFeedPost,
    getUserPosts,
    likePosts
}