const express = require("express");
const mongoose =require("mongoose");

// 1. 접속주소와 db이름 세팅
mongoose.connect('mongodb://localhost:27017/data', {userNewUrlParser:true, userUnifiedTopology:true});

// 2. db 연결
const db = mongoose.connection;

// 3. event 이용하며 접속
db.on('err',()=>{
    console.log('connection failed');
})
db.once('open',()=>{
    console.log('connected!');
})
const port = 5000; 
const app = express();

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));

// 4. 스키마 생성
const test= mongoose.Schema({
    name:String,
    age:Number
})

// 5. 4번의 스키마를 실제 컬렉션 생성
const Test = mongoose.model('aa',test);
// test라는 스키마를 사용해서 aa라는 테이블을 만듦, aa를 Test가 가리키게 함.
app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'pug')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

app.get("/",(req,res)=>{
    res.send("hi node");
})

// 1) insert - 한 개의 데이터 저장(new로 객체 생성해서 save()메서드 이용 => insertOne)
// mconst person = new Test({name:'kim', age:35});
// new Test({name:'park', age:40}).save((err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Saved!!');
//     }
// })

// 2) insertMany 사용
// Test.insertMany([{name:"kang", age:15}, {name:"ko", age:70}, {name:"min", age:90}],(err,result)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
// })

// 3) 전체 데이터 가져오기
// Test.find({},(err,result)=>{
//     if(err){
//         console.log(err);
//     }else{
//         result.forEach((ele)=>{
//             console.log(ele.name, ele.age);
//         })
//     }
// })

// 4) 특정값 가져오기
// Test.findOne({_id:'60fe37dfd457993998d217db'},(err,result)=>{
//     if(err) console.log(err);
//     else{console.log(result)};
// })

// 5) 값 수정하기
// Test.updateOne({_id:'60fe37dfd457993998d217db'},{name:'ho'},(err)=>{
//     if(err) console.log(err);
//     else console.log('success!');
// })

// 6) 값 수정하기 2
// Test.updateMany({name:"park"},{$set:{age:100, name:"park3"}},(err,result)=>{
//     if(err) console.log(err);
//     else console.log(result);
// })

// 7) 값 삭제하기
Test.deleteOne({name:"park3"},(err)=>{
    if(err) console.log(err);
    else console.log('deleted!!');
})

app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})