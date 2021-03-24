const express = require('express')
const path = require('path')
const shortid = require('shortid')
const multer = require('multer')
const {createProduct, getProduct} = require('../controllers/product')
const {adminMiddleware, requireSignIn} = require('../common-middleware/index')
const router = express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(path.dirname(__dirname),'uploads') )
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({storage})

router.post('/create', requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct)
router.get('/get_product')

module.exports = router
