const jwt = require("jwt-simple");
const SECRET = require('../config/passport.config').SECRET
module.exports = {
    accessToken : async (req , res) => {
        console.log("Access-Token " , req.userId)
        const payload = {
            userId : req.userId , 
            atTime : new Date().getTime()
        }
        var token = jwt.encode(payload ,SECRET)
        res.status(200).json({"statusMessage" : true , "resultMessage" : "Accept Token " , "accessToken" : token  })
     
    }
}