const express = require('express')
const {validateSignUpRequest,validateSignInRequest,isRequestValidated} = require("../../validators/auth");
const router = express.Router()
const {signup, signin}  = require('../../controllers/admin/auth')


router.post('/signup',validateSignUpRequest,isRequestValidated, signup)
router.post('/signin',validateSignInRequest,isRequestValidated, signin)


module.exports = router
