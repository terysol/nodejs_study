const express = require("express")
const port = 5000;
const app=express();
const cookieParser=require("cookie-parser");

app.use(cookieParser());
app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'pug')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기


app.get("/",(req,res)=>{
    res.send("hi node");
})

app.get('/cookie',(req,res)=>{
    res.render("cookie_form");
})
app.post("/cookie",(req,res)=>{
    var id=req.body.uid;
    res.cookie('userId',id);
    res.send("쿠키 설정완료");
})

app.get("/result",(req,res)=>{
    console.log(req.cookies.userId);
    console.log(req.cookies['userId']);
})

app.listen(port,()=>{
    console.log(`Connection to ${port}`);
})