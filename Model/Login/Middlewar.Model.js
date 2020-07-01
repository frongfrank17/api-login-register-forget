const bcryty =require('bcrypt')
const config = require("../config/db.config")
const db = config.monogodb
const uri = config.url 
module.exports =  {
    Mid : async (req , res , next) => {
        var salt = await bcryty.genSalt(10)
        var hashpassword = await bcryty.hash(req.body.password, salt)
                var query =  {
                    "username" : req.body.username , 
                    "password" : req.body.hashpassword
                }
                console.log("Middleware" , query)
                db.connect(uri , config.option,  (err , db_)=>{ 
                    console.log("connected !")
                    try {

                        db_.db("Admin_user").collection("user").findOne(query , (err , result) => {
                            console.log( "result to database", result)
                            if(!err && result != null) {
                                req.userId = result.username
                                next()
                            }else {
                                res.json({"statusMessage" : false , "resultMessage" : err})
                            }
                        })
                    } catch (error) {
                            console.log("Catch Err :"+error)
                            res.send(error)
                    }
                })

    }
}