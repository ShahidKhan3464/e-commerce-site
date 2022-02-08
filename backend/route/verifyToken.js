const jwt = require('jsonwebtoken')
const User = require('..//model/User')
require('dotenv/config')

module.exports = async (req, res, next) => {
    try {
        const verify = jwt.verify(req.headers.token, process.env.SECRET)  // To verify the token
        const rootUser = await User.findOne({ _id: verify._id })
        req.verify = verify
        req.rootUser = rootUser
        next()
    }
    catch (err) {
        res.send(err.message)
    }
}