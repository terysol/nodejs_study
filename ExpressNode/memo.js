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


app.get("/memo",(req,res)=>{
    res.render("memo_form");
})

app.post("/memo",(req,res)=>{
    let writer= req.body.writer;
    let date = req.body.date;
    let description = req.body.description;
    let info = writer + '\t' + date + '\t' + description + '\n';

    fs.appendFile("message.txt",info,'utf8',(err)=>{
        if(err) console.log(err);
        else res.send("메모가 저장되었습니다");
    })
})
app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})