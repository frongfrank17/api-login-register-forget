const router = require('express').Router()
const db = require('../Model/config/db.config')
const bcryty =require('bcrypt')
router.get('/' ,(req , res) =>{
  
        db.monogodb.connect(db.url , (err , db) => {
            if(err) throw err 
            db.db('Admin_user').collection('user').find({}).toArray((err , result) =>{
                if (err) throw err 
                res.status(200).json(result)
                db.close()
            })

        })
})

router.post('/' ,  async (req , res , next) =>{
    console.log("REGISTER!")
    console.log(req.body)
    var salt = await bcryty.genSalt(10)
    var hashpassword = await bcryty.hash(req.body.password, salt)
     var resgister = {
         "username" :  req.body.username , "email" :  req.body.email , "password" : hashpassword
     }
    db.monogodb.connect(db.url  , (err , db) => {
        try {
        db.db("Admin_user").collection("user").insert(resgister , (err , result) => {
            if (err) throw err 
             console.log("resgiter inserted ! " + result.insertedCount)
             res.status(200).json({"statusMessage" : "resgister" , "result" : result.insertedCount})
             db.close()
        })
    }catch(error) {
        console.log("Catch Error : "+error)
        next(error)
    }
    })
})


module.exports = router