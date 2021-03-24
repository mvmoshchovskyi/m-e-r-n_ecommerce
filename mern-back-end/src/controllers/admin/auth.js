const User = require('../../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    const {email, firstName, lastName, password} = req.body
    User.findOne({email})
        .exec((err, user) => {
            if (user) return res.status(400).json({message: 'admin already exists'})
        })
    const _user = new User({
        email, firstName, lastName, password,
        username: Math.random().toString(),
        role: 'admin'
    })
    _user.save((error, data) => {
        if (error) {
            return res.status(400).json({message: 'something went wrong'})
        }
        if (data) {
            return res.status(201).json({message: 'Admin created successfully'})
        }
    })
}

exports.signin = (req, res) => {

    const {email, password} = req.body
    User.findOne({email})
        .exec((error, user) => {
            if (error) return res.status(400).json({message: error})
            if (user) {
                if (user.authenticate(password) && user.role === 'admin') {
                    const secret = process.env.JWT_SECRET
                    const token = jwt.sign({_id: user._id,role: user.role}, secret, {expiresIn: '48h'})
                    const {_id, email, firstName, lastName, password, role, fullName} = user
                    res.status(200).json({
                        token,
                        user: {_id, email, firstName, lastName, password, role, fullName}
                    })
                } else {
                    return res.status(400).json({message: 'invalid password'})
                }
            }
        })
}

