const config  = require('../config/db.config')
const db = config.monogodb
const uri = config.url
module.exports = {
    ChangePassword : async (req , res) => {
                var query = {username : req.username }
                var set = {$set : {"password" : req.body.password}}
                db.connect(uri , {useNewUrlParser:true , useUnifiedTopology:true} , (err , db_)=> {
                    try {
                        db_.db("Admin_user").collection("user").findOneAndUpdate(query , set , (err , result) => {
                                if (err) {
                                    console.log("query : "+err)
                                }else {
                                    res.status(200).json({"message" : "changepassword" , "result" : "susscessfully !"})
                                }
                                db_.close()
                        })
                    }catch(error) {console.log(err)} 
                })
    }
}