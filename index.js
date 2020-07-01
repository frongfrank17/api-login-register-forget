const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyparser = require('body-parser')
const passport = require("passport");
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 8081
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

passport.use(require("./Model/config/passport.config").jwtAuth);
app.use("/api/v1/login" , require('./Route/Login.router') )
app.use("/api/v1/register" , require('./Route/Register.router'))
app.use("/api/v1/profile" , require('./Route/profile.router'))
app.use("/api/v1/forgetpassowrd" , require('./Route/forgetPassword.router'))
app.use((req, res, next) => {
  
    const err = new Error('Not found');
  
    err.status = 404;
    
    next(err);
    
  });
  
app.use((err, req, res, next) => {
  
    res.status(err.status || 500);
  
    res.send({  error: {  status: err.status || 500 ,  message: err.message  } });
  
  })
server.listen( PORT,()=>console.log("server runing "+":"+PORT))