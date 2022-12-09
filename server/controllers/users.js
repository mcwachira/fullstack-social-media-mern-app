const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/Post')

//get user
const getUser = async (req, res) => {

    //get id from req..params

    const { id } = req.params
    try {

        //find user using id

        const user = await User.findById(id).exec()

        if (!user) {
            res.status(401).json({ message: 'User with that id does not exist' })
        }

        res.status(201).json(user)


    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}


//get user friends
const getUsersFriend = async (req, res) => {

    const { id } = req.params

    try {

        //user using id

        const user = await User.findById(id).exec()

        if (!user) {
            res.status(400).json({ message: 'User with that email does not exist' })
        }

        //get user friends via their id
        const friends = await Promise.all(
            user.friends.map((id), User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath
                }
            }
        )

        res.status(201).json(user, token)

    } catch (error) {
        res.status(500).json(formattedFriends)
    }
}

//update your friends list . add  and remove friend
//get user friends
const addRemoveFriends = async (req, res) => {

    const { id, friendId } = req.params

    try {

        //user using id
        const user = await User.findById(id).exec()

        //gets friends id
        const friend = await User.findById(friendId)

        if (user.friends.includes(friendId)) {
            //remove friend

            //remove a friend from my list
            user.friends = user.friends.filter((id) => id !== friendId)

            //the friend removing me from their list
            friend.friends = friend.friends.filter((id) => id !== friendId)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        //save the updated user and friend

        await user.save();
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id), User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath
                }
            }
        )

        res.status(200).json(formattedFriends)


    } catch (error) {
        res.status(500).json(formattedFriends)
    }


}

module.exports = {
    getUser,
    getUsersFriend,
    addRemoveFriends
}