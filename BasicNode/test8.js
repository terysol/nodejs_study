const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.listen(5000,()=>{
    console.log("Running on server 5000");
})

server.on("connection", (socket)=>{
    console.log("사용자가 접속했습니다. ");
})

server.on("request",(req,res)=>{
    fs.readFile("lion1.png",(err,data)=>{
        if(err) console.log(err);
        else{
            res.writeHead(200,{"Content-Type" : "image/png"});
            res.write(data);
            res.end();
        }
       
    })
})