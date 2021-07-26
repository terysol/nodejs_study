const express = require("express");
const mongoose =require("mongoose");

// 1. 접속주소와 db이름 세팅
mongoose.connect('mongodb://localhost:27017/data', {userNewUrlParser:true, userUnifiedTopology:true});

// 2. db 연결
const db = mongoose.connection;

// 3. event 이용하며 접속
db.on('err',()=>{
    console.log('connection failed');
})
db.once('open',()=>{
    console.log('connected!');
})
const port = 5000; 
const app = express();

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'pug')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

app.get("/",(req,res)=>{
    res.send("hi node");
})

app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})