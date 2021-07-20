// <event>
// 사용자 접속 : connection
// 사용자 요청: request
// 사용자 종류 : close

const http = require("http");

const server = http.createServer();

server.listen(5000,()=>{
    console.log("Running Http Server at localhost...");
})

server.on("connection", (socket)=>{
    console.log("사용자가 접속했습니다. ");
})

server.on("request",(req,res)=>{
    console.log("사용자의 요청이 들어왔습니다. ");
    res.writeHead(200,{"Content-Type" : "text/html; charset=utf-8"});
    res.write("<html><head><title></title></head><body>");
    res.write("<h1>Hello nodejs</h1>");
    res.write("</body></html>");
    res.end();      // 응답을 모두 보냄. 사용자에게 응답을 전송한다. 
})