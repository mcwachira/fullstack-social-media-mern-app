const jwt = require('jsonwebtoken')

//protecting our routes for updating and deleting
const hasAuthorization = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            //get token from our header
            token = req.headers.authorization.split(" ")[1]
            console.log(token)

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log({ decoded: decoded.id })
            //req.user = decoded
            //get the user
            req.user = await User.findById(decoded.id).select('-password')
            next()

        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'Not Authorized ' })

        }
    }

    if (!token) {
        res.status(401);
        throw new Error('No authorized Token access denied')
    }

}

module.exports = {
    hasAuthorization
}