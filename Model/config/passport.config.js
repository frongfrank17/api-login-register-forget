const config = require('./db.config')
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "HS256"
const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
   secretOrKey: SECRET,
}
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
    console.log("Authorization")
    config.monogodb.connect(config.url , (err , db_) => {
        try {
            db_.db("Admin_user").collection("user").findOne({"username":payload.userId} , (err , result) => {
                console.log(err)    
                console.log("result " , result)
                if(!err){
                    console.log("not error")
                        //req.username =  payload.userId
                        done(null, true);
                        db_.close()
                    }
                    else {
                        console.log("error")
                        done(null , false)
                        db_.close()
                    }
            })
        }catch(error) {console.log("catch",error)}
    })

});

const requireJWTAuth = passport.authenticate("jwt",{session:false});
module.exports = {
    jwtAuth , requireJWTAuth , SECRET
}