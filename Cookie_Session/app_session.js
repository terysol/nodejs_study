const express = require("express")
const port = 5000;
const app=express();
const cookieParser=require("cookie-parser");
const session = require('express-session')

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));
app.use(session({
    secret: 'aowieidnfeiofjweo',     // id를 브라우저에 저장할 때 랜덤하게 암호해주는 것
    resave: false,                   // 사용자가 접속할 때마다 세션아이디를 새로 발급하느냐 아니냐를 결정하는 것
    saveUninitialized: true          // 사용자가 접속해서 세션을 사용전까지는 세션아이디를 발급하지 말아라
}))

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'pug')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기


app.get("/",(req,res)=>{
    res.send("hi node");
})

app.get("/session",(req,res)=>{
    req.session.uid=1;
    res.send('session created !');
})

app.get("/result",(req,res)=>{
    res.send(`session: ${req.session.uid}`);
})
app.listen(port,()=>{
    console.log(`Connection to ${port}`);
})