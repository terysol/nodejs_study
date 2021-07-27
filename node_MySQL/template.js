const express = require("express");
const mysql = require("mysql");
const format = require("date-format");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const port = 5000; 
const app = express();

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'ejs')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

app.get("/",(req,res)=>{
    res.send("<h1>Mysql & ejs </h1>");
})

app.get("/new",(req,res)=>{
    res.render("new");
})
app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})