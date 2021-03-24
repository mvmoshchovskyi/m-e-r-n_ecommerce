const jwt = require('jsonwebtoken')
exports.requireSignIn = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(300).json({message:'authorization required'})
    }
    const secret = process.env.JWT_SECRET
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, secret)
    req.user = user
    next()
}
exports.userMiddleware = (req, res, next) => {
    // if (req.user.role !== 'user') {
    //     res.status(400).json({message: 'User access denied'})
    // }
    next()
}
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(400).json({message: 'Admin access denied'})
    }
    next()
}
