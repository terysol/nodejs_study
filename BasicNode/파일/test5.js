const fs=require("fs");

fs.readFile("data.txt",'utf8',(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})

console.log("--------------------------");

const data= new Uint8Array(Buffer.from('nodejs is server side javascript'));
fs.writeFile("message.txt",data,(err)=>{
    if(err) console.log(err);
    else console.log("save");
})
