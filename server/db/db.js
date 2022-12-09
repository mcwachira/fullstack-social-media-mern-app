const mongoose = require('mongoose')
const colors = require('colors');
const User = require('../models/User')
const Post = require('../models/Post')
const { users, posts } = require('../data/index')

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            name: 'fullstack-social-media-app',
        })
        // User.insertMany(users)
        // Post.insertMany(posts)

        console.log(`MongoDb  connected ${connect.connection.host}`.blue.underline)
    } catch (error) {
        console.log(`error :${error.messages}`.red.underline.bold)
        process.exit(1)
    }


}


module.exports = connectDb;