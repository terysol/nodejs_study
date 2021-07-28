const mysql = require("mysql");
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mirim2",
    database:"testdb"
})

module.exports=conn;