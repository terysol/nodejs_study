// 웹서버 
const http = require("http");

// 서버객체를 만든다. 
const server= http.createServer();

// 웹서버 실행해서 대기
server.listen(3000,()=>{
    console.log("Running Http Server at localhost...");
});

