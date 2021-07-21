const express = require("express");
const port = 5000;
const app = express();

app.use(express.static(__dirname + "/public"));   // --> 절대경로
app.use(express.urlencoded({extended : true}));
// 응답할 때 객체안에 객체를 넣을 수 있도록 하겠다. 

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'pug')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

/* 라우터 */
app.get("/",(req,res)=>{
    res.send("hi pug");
})

app.get("/template",(req,res)=>{
    // template로 접속했을 때, temp 라는 pug파일이 열리게 함.
    res.render("temp");
})

app.get("/login",(req,res)=>{
    res.render("login_form");
})

app.post("/login",(req,res)=>{
    let _id=req.body.id;
    let _pass= req.body.password;
    res.send(`아이디 : ${_id} 비밀번호 : ${_pass}`);

})

app.get("/temp",(req,res)=>{
    let _id=req.query.id;
    let _pass= req.query.password;
    res.send(`아이디 : ${_id} 비밀번호 : ${_pass}`);
})

app.listen(port,()=>{
    console.log(`Connection to ${port}`);
})