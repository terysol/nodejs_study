const express = require("express");
const port = 5000;
 
const app = express();

app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    res.send("Hi nodejs");
})

app.get('/dynamic',(req,res)=>{
    let list="";
    for(let i=0;i<5;i++){
        list=list+'<li>hello</li>';
    }
     //hello 5번만 li로 출력
     let output=`
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <ul>
            ${list}
        </ul>    
    </body>
    </html> `;
    res.send(output);
    
})
app.listen(port,()=>{
    console.log(`Running to ${port}`);
})