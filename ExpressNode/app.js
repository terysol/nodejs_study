const express = require("express");
const port = 5000;

const app = express();

app.use(express.static('public'));
// static 미들웨어사용해서 public를 /로 지정하는 친구

// app.use(express.static(__dirname + "/public"));   --> 절대경로
app.listen(port,()=>{
    console.log(`Connection to ${port}`);
})