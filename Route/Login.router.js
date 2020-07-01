const router = require('express').Router()

const Authorization = require("../Model/Auth.Model")
const passport = require('../Model/config/passport.config').requireJWTAuth
router.get('/auth' , passport, Authorization.MiddleAuthorization, Authorization.AllowAuthorization)

const Midllwar = require("../Model/Login/Middlewar.Model").Mid
const AccessToken = require("../Model/Login/accessToken.Model").accessToken
router.post('/access' , Midllwar , AccessToken)
const SendOTP = require('../Model/Login/sendOTP.Model')
router.get("/sendotp" , SendOTP.sendOTP )
module.exports = router