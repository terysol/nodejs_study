const express = require("express");
const fs= require("fs");
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