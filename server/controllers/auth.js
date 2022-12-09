const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/Post')

const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            //friends,
            location,
            occupation,

        } = req.body


        //check if all information is present


        //generate hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        })

        //save our user
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)


    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body


    try {

        //check if user exist via email
        const user = await User.findOne({ email }).exec()

        if (!user) {
            res.status(400).json({ message: 'User with that email does not exist' })
        }

        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({ message: 'Wrong password please enter password again' })

        }

        //generate token

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        //remove password
        delete user.pass

        res.status(201).json(user, token)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    register,
    logIn
}