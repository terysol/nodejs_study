const express = require("express");
const mysql = require("mysql");
const multer =require("multer");
const port = 5000; 
const app = express();

const config=require('./db/dbconn');
const conn = mysql.createConnection(config);
conn.connect();

// app.use(express.static(__dirname + "/public"));  
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'public/uploads/img');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }       // file.fieldname + '-' + Date.now()
  })
   
var upload = multer({ storage: storage })

app.use(express.static('public'));
app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'ejs')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

const sql={
    list:'select * from image_upload order by id desc',
    insert:'insert into image_upload(file_name,originalname) values(?,?)'    
}

app.get("/",(req,res)=>{
    res.render("file");
})

app.post("/upload", upload.single('image'),(req,res)=>{
    conn.query(sql.insert,[req.file.path,req.file.originalname],(err)=>{
        if(err) console.log(err);
        else{
            console.log('inserted!');
            res.redirect("/");
        }
    })
})

app.get("/show",(req,res)=>{
    conn.query(sql.list,(err,data)=>{
        if(err) console.log(err);
        else{
           res.render("list",{datas:data});
        }
    })
})

app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})