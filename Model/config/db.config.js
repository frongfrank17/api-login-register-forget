const monogodb = require('mongodb').MongoClient
//const mysql2 = require('mysql2')
var url = "mongodb://localhost:27017/User";
const option = {useNewUrlParser:true , useUnifiedTopology:true} 
/*var connect = {
    host : "us-cdbr-east-05.cleardb.net",
    user : "b1d81f5df3da77" , 
    password : "23c9b6d7",
    database : "heroku_f4cb390e2644159"
}

var db =  mysql2.createConnection(connect)

*/

module.exports = {
     monogodb , url , option
}