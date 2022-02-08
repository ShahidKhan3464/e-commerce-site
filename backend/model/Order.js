const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],

    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },

    paymentMethod: { type: String, required: true },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Order', orderSchema)