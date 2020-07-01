const router =  require('express').Router()
const forgetPassword = require('../Model/forgetPassoword')
router.post('/sentemail' ,forgetPassword.sentToEmail , forgetPassword.AccessTokenEmail)
// ---- Access Token 
const passport = require('../Model/config/passport.config').requireJWTAuth
const AuthEmail = require("../Model/forgetPassoword")
router.get("/" , passport , AuthEmail.MiddleEmailAuthorization , AuthEmail.CheckToken  )
// ---- chech token email
router.post("/ressetpassword" , passport ,  AuthEmail.MiddleEmailAuthorization , forgetPassword.ResetPassword )
module.exports = router