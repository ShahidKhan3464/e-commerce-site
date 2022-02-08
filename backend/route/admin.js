const express = require('express')
const adminRoute = express.Router()
const User = require('..//model/User')
const admin = require('../Admin')

adminRoute.get('/admin', (async (req, res) => {
    try {
        const createdUsers = await User.create(admin)
        res.send(createdUsers)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}))

module.exports = adminRoute