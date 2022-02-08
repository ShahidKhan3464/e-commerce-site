const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Product', productSchema)