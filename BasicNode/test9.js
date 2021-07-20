const express = require("express");

const app = express(); // express 객체 생성

app.get("/",(req,res)=>{
    res.send("Hi Express ~");
})
app.listen(5000,()=>{
    console.log("Running express server at 127.0.0.1 ......");
})