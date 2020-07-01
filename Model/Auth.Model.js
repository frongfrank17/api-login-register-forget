const config = require('./config/db.config')
const jwt = require("jwt-simple");
const SECRET = require('./config/passport.config').SECRET
const db = config.monogodb
const uri = config.url
module.exports = {
    MiddleAuthorization : async (req , res ,next) => {
            console.log("Mid Authentication")
            const authHeader = req.headers['authorization'];
            const username = jwt.decode(authHeader , SECRET)
            req.username = username.userId
            next()
            
    },
    AllowAuthorization : async (req , res , next) => {
        console.log("data Authoz")
        console.log("req" , req.username)
            db.connect(uri , (err , db_) => {
                
            try {
                if(err) throw err 
                db_.db("Admin_user").collection("user").findOne({"username" : req.username} , (err , result) => {
                    if(!err && result !=null){
                    res.status(200).json({"statusMessage" : true , "resultMessage" : result})
                    }else{
                        res.json({"statusMessage" :false , "resultMessage" : err})
                    }
                })
            }catch(error) {console.log("catch" , error)}
            } )
    }
}