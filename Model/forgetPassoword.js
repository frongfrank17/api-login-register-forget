const nodemailer = require('nodemailer')
const config = require('./config/db.config')
const jwt = require("jwt-simple");
const SECRET = require('./config/passport.config').SECRET
const db = config.monogodb 
const uri = config.url
const op = config.option
const dot = require('dotenv').config().parsed

module.exports = {
    //--- Passport >> Auth >> Check Token 
    MiddleEmailAuthorization : async (req , res ,next) => {
        console.log("Mid Authentication")
        const authHeader = req.headers['authorization'];
        const Accept = jwt.decode(authHeader , SECRET)
        req.email = Accept.email
        req.userId = Accept.userId
        next()
        
    },
    CheckToken : async (req , res ,next ) =>  {
        var query = {"username" : req.userId , "email" : req.email }
        db.connect(uri , op , (err , db_) => {
            try {
                db_.db("Admin_user").collection("user").findOne(query , (err , result) => {
                    if(err) {
                        res.json({"statusMessage" : false , "result" : " NOT ACCEPT "})
                        db_.close()
                    }else {
                        res.status(200).json({"statusMessage" : true , "result": result})
                        db_.close()
                    }
                })
            }catch (error) {
                console.log("Catch Error : "+error)
                res.send(error)
            }
        })
    },
    // Passport >> Auth >> ResetPassword 
    ResetPassword : async (req, res ,next) => {
                var queryEmail =  {  username : req.userId, email :req.email }
                var ResetPassword = { password : req.body.ResetPasswordFromEmail }
                db.connect(uri , op , (err , db_) =>{
                    try {
                        db_.db("Admin_user").collection("user").findOneAndUpdate(queryEmail , ResetPassword , (err,result)=>{
                            if(err) {
                                console.log("DB :"+err)
                                next(err)
                            }else {
                                res.status(200).json({"statusMessage" : true, "resultMessage" :" Reset Passowrd suscessfully!" })
                            }
                        })

                    } catch (error) {
                        console.log("Error catch :"+error)
                        next(error)
                    }
                })
    },
    //--  sentToEMAIL >> Aceess Token 
    sentToEmail : async (req ,res , next) =>{

                var emailForget = req.body.emailForget
                try {
                    db.connect(uri , op , (err, db_) =>{
                        db_.db('Admin_user').collection("user").findOne({"email" : emailForget} , (err , result) =>{
                                if(err) {
                                    console.log("Error DB :",err)
                                    next(err)
                                }else {
                                    req.userId = result.username
                                    next()
                                }
                        })
                    })

                } catch(error) {
                    console.log("Error Catch : " ,error);
                    next(error)
                }   
    },
    AccessTokenEmail : async (req, res , next) => {
                        const payload = {
                            userId : req.userId , 
                            email  : req.body.ForgetEmail , 
                            atTime : new Date().getTime()
                        }
                        var tokenForget = jwt.encode(payload ,SECRET)
                        var mailOp = {
                            from : "montree.pro98@gmai.com",
                             to : req.body.ForgetEmail, 
                             subject : "forget password " , 
                             html: `<h4> Address ${req.body.ForgetEmail}</h4>
                                    <h5> Address ${req.userId}</h5>
                                <p>Rest Password click urI origin</p>
                                <p>URL : ${dot.CLIENT_LOCALHOST+"/resetpassword/"+tokenForget}</p>`
                            }
                            transporter.sendMail(mailOp , (err , info) => {
                                if(err) {
                                    console.log("Error mail :" ,err)
                                    res.send("Error MAil"+err)
                                }else {
                                    res.status(200).json({"statusMessage" : true , "resultMessage" : info})
                                }
                            })
    }
}
//#endregion



