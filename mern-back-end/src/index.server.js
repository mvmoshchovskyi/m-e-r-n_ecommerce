const express = require('express')
const env = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const adminRouter = require('./routes/admin/auth.js')
const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
env.config()

const app = express()
const PORT = process.env.PORT || 2000
const username = process.env.MONGO_DB_USER
const password = process.env.MONGO_DB_PASSWORD
const database = process.env.MONGO_DB_DATABASE
mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.l0su6.mongodb.net/${database}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => console.log('database connected'))

app.use(express.json())
app.use('/public',express.static(path.join(__dirname, 'uploads')))
app.use('/api', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', cartRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)

app.get('/', (req, res) => {
    res.json({message: 'hello from server'})
})
app.post('/data', (req, res) => {
    res.status(200).json({message: req.body})
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
