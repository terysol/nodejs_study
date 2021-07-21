const express = require("express");
const multer =require("multer");
const port = 5000; 
const app = express();
// const upload = multer({dest:'uploads/'});

app.use(express.static(__dirname + "/public"));

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

app.get("/",(req,res)=>{
    res.send("hi node");
})

app.get("/upload",(req,res)=>{
    res.render('upload_form');
})

app.post('/upload', upload.single('image'), (req, res) =>{
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    res.send("업로드 되었습니다.");
})

 
app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})