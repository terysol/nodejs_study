const express = require("express")
const port = 5000;
const app=express();
const cookieParser=require("cookie-parser");
const session = require('express-session')
// session의 값은 기본 : 메모리에 저장
// session의 값을 지속적으로 저장하고 싶을 때: file / db

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

app.get("/welcome",(req,res)=>{
    if(req.session.nickName) {//로그인되어 있는 사용자라면 로그아웃 정보까지
        res.send(`hello ${req.session.nickName}
        <a href="/logout">Logout</a>`)
        
        
    }else {//로그인에 실패 또는 로그인되어있지 않은 사용자
        res.render("login_main");
    }
})

app.get("/login",(req,res)=>{
    res.render("login_form");
})

app.post("/login",(req,res)=>{
    let _id=req.body.id;
    let _pass=req.body.password;

    if(_id === "kim" && _pass === "1111"){
        req.session.nickname="solmin";
        
        res.send(`hello ${req.session.nickname}
        <a href="/logout">logout</a>`);
        
    }else{
        res.render("login_fail");
    }
})

app.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        req.session;
    })
    res.render("login_main");
})

app.listen(port,()=>{
    console.log(`Connection to ${port}`);
})