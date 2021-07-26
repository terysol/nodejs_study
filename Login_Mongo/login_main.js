const express = require("express");
const mongoose =require("mongoose");
const port = 5000; 
const app = express();

mongoose.connect('mongodb://localhost:27017/data', {userNewUrlParser:true, userUnifiedTopology:true});
const db = mongoose.connection;
db.on('err',()=>{
    console.log('connection failed');
})
db.once('open',()=>{
    console.log('connected!');
})

const test= mongoose.Schema({
    id:String,
    password:String,
    name:String,
    email:String
})

const User = mongoose.model('user',test);   // user라는 테이블 만듦

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'pug')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

app.get("/",(req,res)=>{
    res.render("login_main");
})

app.get("/show",(req,res)=>{
    User.find({},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.render('login_show',{list:result});
        }
    })
})

app.get("/sign", (req,res)=>{
    res.render("login_sign");
})
app.post("/sign",(req,res)=>{
    let id= req.body.id;
    let password= req.body.password;
    let name=req.body.name;
    let email= req.body.email;

    new User({id:id, password:password, name:name, email:email}).save((err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Saved!!');
        }
    })
    res.redirect("/");
})

app.get("/login",(req,res)=>{
    
})

app.get("/update/:id",(req,res)=>{

})

app.get("/delete",(req,res)=>{

})

app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})