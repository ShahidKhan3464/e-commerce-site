const express = require('express')
const userRoute = express.Router()
const User = require('..//model/User')
const bcrypt = require('bcrypt')                // Hashing the password
const jwt = require('jsonwebtoken')
const auth = require('./verifyToken')
require('dotenv/config')

userRoute.post('/register', async (req, res) => {
    try {
        const duplicateUser = await User.findOne({ email: req.body.email })
        if (duplicateUser == null) {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password, salt)

            const registerUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
            })
            res.send('Your account has been successfully registered')
        }
        else {
            res.status(409).send({ message: 'Email already exist' })
        }
    }
    catch (error) {
        res.status(500).send({ message: 'Something internal network error occurred' })
    }
})

userRoute.post('/login', async (req, res) => {
    try {
        email = req.body.email
        password = req.body.password

        const login_user = await User.findOne({ email: email })
        if (!login_user) return res.status(401).send({ message: 'Invalid password or email' })

        const valid_password = await bcrypt.compare(password, login_user.password)
        if (!valid_password) return res.status(401).send({ message: 'Invalid password or email' })

        const token = jwt.sign({ _id: login_user.id }, process.env.SECRET)
        res.send({ isAdmin: login_user.isAdmin, token: token })
    }
    catch (error) {
        res.status(500).send({ message: 'Something internal network error occurred' })
    }
})

userRoute.get('/profile', auth, async (req, res) => {
    try {
        res.send(req.rootUser)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

userRoute.put('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.verify._id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.body.password) user.password = await bcrypt.hash(req.body.password, 10)

            const updatedUser = await user.save()
            res.send({ message: 'Your Profile has been successfully updated' })
        }
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = userRoute