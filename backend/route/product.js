const express = require('express')
const productRoute = express.Router()
const Product = require('..//model/Product')
const upload = require('..//upload')
const auth = require('./verifyToken')

productRoute.get('/', async (req, res) => {
    try {
        const products = await Product.find({})
        res.send(products)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

productRoute.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id })
        if (product) return res.send(product)
        res.status(404).send({ message: 'Product Not Found !!!' })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

productRoute.post('/product', auth, upload.single('file'), async (req, res) => {
    try {
        const file = new Product({
            name: req.body.name,
            image: req.file.path,
            price: req.body.price,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
        })
        await file.save()
        res.send('Product has been uploaded successfully')

    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = productRoute