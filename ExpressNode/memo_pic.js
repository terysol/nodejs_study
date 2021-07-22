const express = require("express");
const multer =require("multer");
const fs= require("fs");
const port = 5000; 
const app = express();

app.use(express.static(__dirname + "/public"));
app.use('/img',express.static('uploads'));  
app.use(express.urlencoded({extended : true}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }       // file.fieldname + '-' + Date.now()
  })
var upload = multer({ storage: storage })

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'pug')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기


app.get("/memo",(req,res)=>{
    res.render("memo_pic");
})

app.post("/memo", upload.single('image'),(req,res)=>{
    let writer= req.body.writer;
    let date = req.body.date;
    let description = req.body.description;
    let title=req.file.originalname;

    console.log(title);
    
    let info = writer + '\t' + date + '\t' + description + '\n';

    fs.appendFile("message.txt",info,'utf8',(err)=>{
        if(err) console.log(err);
    })
    res.send(`${req.body.writer} <br>
            ${req.body.date} <br/>
            ${req.body.description} <br/>
            <img src="uploads/${req.file.originalname}">`);
})
app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})