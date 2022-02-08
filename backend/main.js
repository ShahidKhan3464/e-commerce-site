const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const userRoute = require('./route/user')
const adminRoute = require('./route/admin')
const productRoute = require('./route/product')
const orderRoute = require('./route/order')
const port = 3001 || process.env.PORT
require('dotenv/config')

app.use(express.json())
app.use(cors())

app.use('/api/upload', productRoute)
app.use('/api/products', productRoute)
app.use('/api/user', userRoute)
app.use('/api/user', adminRoute)
app.use('/api/order', orderRoute)

mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to DB'))

app.listen(port, () => console.log(`listening to the given port no ${port}`))