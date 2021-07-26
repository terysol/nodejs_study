const express = require("express");
const MongoClient = require('mongodb').MongoClient;
// mongoclient 객체를 생성함. (mongoclient는 접속할 db주소와 db이름이 필요함)
const url="mongodb://localhost:27017";
const dbname="testMongo";


const port = 5000; 
const app = express();

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));

let db;
MongoClient.connect(url, (err, client)=>{  // client: 우리가 mongodb와 소통하는 매개체 
    if(err){
        console.log(err);
    }else{
        console.log('Connected mongodb');
        db=client.db(dbname);   // db: testMongo
        login = db.collection('login');
        console.log('created!!');
    }
})

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