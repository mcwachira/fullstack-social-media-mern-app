const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    // userId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User'
    // },

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },

    description: {
        type: String
    },

    location: {
        type: String
    },
    picturePath: {
        type: String,

    },

    userPicturePath: {
        type: String,


    },
    likes: {
        type: Map, //performant
        of: Boolean

    },


    comments: {
        type: Array,
        default: []
    },




    // userPicturePath: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Images'
    // },

    // picturePath: {
    //     type: mongoose.Schema.ObjectId, ref:
    //         'Images'
    // },

    // likes: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User'
    // }],

}, { timestamps: true }
)


module.exports = mongoose.model('Post', PostSchema)