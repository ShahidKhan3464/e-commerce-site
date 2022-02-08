const express = require('express')
const orderRoute = express.Router()
const Order = require('..//model/Order')
const auth = require('./verifyToken')

orderRoute.get('/mine', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.verify._id })
        if (orders) res.send(orders)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

orderRoute.post('/', auth, async (req, res) => {
    try {
        if (req.body.orderItems.length === 0) return res.status(400).send({ message: 'Cart is empty' })

        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shipping,
            paymentMethod: req.body.payment,
            subTotal: req.body.subTotal,
            tax: req.body.tax,
            grandTotal: req.body.grandTotal,
            user: req.rootUser._id
        })
        const createdOrder = await order.save()
        res.send({ message: 'New Order Created', order: createdOrder })
    }
    catch (err) {
        res.status(500).send({ message: 'Something internal network error occurred' })
    }
})

orderRoute.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) return res.send(order)
        res.status(404).send({ message: 'Order Not Found' })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = orderRoute