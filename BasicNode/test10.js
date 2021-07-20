const express = require("express");
const port = 5000;
const app = express();

// 미들웨어: 중간에 가로채는 것
app.use((req,res,next)=>{
    // req:사용자의 정보, res:응답정보, next : 다음 미들웨어 호출
    console.log("첫번째 미들웨어");
    req.user="kim";
    next();
})

app.use((req,res)=>{
    console.log("두 번째 미들웨어");
    // res.send(`서버에서 응답한 결과 : ${req.user}`); 
    // 하나의 블럭에서는 res.send()가 하나씩 있어야 함

    const person ={name:"kim",age:35};
    const person2=JSON.stringify(person);   // json형식을 문자열로 바꿈
    res.send(person2);
    // 문자열을 json형식 : JSON.parse()
})

app.listen(port,()=>{
    console.log(`Connection to ${port}`);
})