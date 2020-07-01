const config = require('../config/db.config')
const db = config.monogodb 
const uri = config.url
const op = config.option
module.exports = {
    editProfile : async (req , res) => {
        /*    const query = { "username" : req.params.username }
            const set = {$set : {}}
           db.connect(uri,op , (err ,db_) => {
               db_.db("Admin_user").collection("user").findOneAndUpdate()
           })
          */
         res.status(200).json({"message" : "edit Profile NOT Functuion "})
    }
}