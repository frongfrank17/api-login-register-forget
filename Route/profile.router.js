const { requireJWTAuth } = require('../Model/config/passport.config')
const { MiddleAuthorization } = require('../Model/Auth.Model')
const router = require('express').Router()
/*
const Profile = require('../Model/Profile/Profile.Model').editProfile
router.put('/:username' , Profile)
*/
const Passport = require('../Model/config/passport.config').requireJWTAuth
const Authoz = require('../Model/Auth.Model').MiddleAuthorization
const ChangePwd = require('../Model/Profile/changePassword.Model').ChangePassword
router.post('/Auth/change/password' , Passport , Authoz , ChangePwd )
module.exports = router