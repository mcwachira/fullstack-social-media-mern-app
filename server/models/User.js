const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    picturePath: {
        type: String,
        default: ''

    },
    // picturePath: [{ type: mongoose.Schema.ObjectId, ref: 'Images' }],

    friends: {
        type: Array,
        default: []
    },

    location: {
        type: String
    },

    occupation: {
        type: String
    },

    viewedProfile: {
        type: Number,
    },
    impressions: {
        type: Number,
    }


}, { timestamps: true }
)


module.exports = mongoose.model('User', UserSchema)