const express = require('express')
const {addItemToCart, getCategory} = require('../controllers/cart')
const {userMiddleware, requireSignIn} = require('../common-middleware/index')
const router = express.Router()


router.post('/cart/add_to_cart', requireSignIn, userMiddleware, addItemToCart)
router.get('/get_category', getCategory)

module.exports = router
