const express = require('express')
const multer = require('multer')
const path = require('path')
const shortid = require('shortid')
const {addCategory, getCategory} = require('../controllers/category')
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

router.post('/create', requireSignIn, adminMiddleware,upload.single('categoryImage'), addCategory)
router.get('/get_category', getCategory)

module.exports = router
