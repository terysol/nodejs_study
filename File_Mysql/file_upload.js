const express = require("express");
const mysql = require("mysql");
const fs=require("fs");
const multer =require("multer");
const format = require("date-format");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const port = 5000; 
const app = express();

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mirim2",
    database:"testdb"
})
conn.connect();

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype === "image/jpg" || file.mimetype === "image/png"){
            console.log("그림파일");
            cb(null,"uploads/img");
        }else{
            console.log("텍스트 파일");
            cb(null,"uploads/texts");
        }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }       // file.fieldname + '-' + Date.now()
  })
   
var upload = multer({ storage: storage })

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'ejs')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

// 날짜 formatting
const date = moment().format('YYYY-MM-DD HH:mm:ss');

app.get("/",(req,res)=>{
    res.render("file");
})

app.post("/upload", upload.single('image'),(req,res)=>{
    conn.query("insert into file_upload(file_name) values(?)",[req.file.path],(err)=>{
        if(err) console.log(err);
        else{
            console.log('inserted!');
            res.redirect("/");
        }
    })
})
app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})