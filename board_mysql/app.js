const express = require("express");
const format = require("date-format");
const mysql = require("mysql");
const moment = require("moment");
const session = require('express-session');
const multer =require("multer");
const methodOverrider=require("method-override");
var MySQLStore = require('express-mysql-session')(session);
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const port = 5000; 
const app = express();

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'ejs')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

// 쿼리를 객체로 생성
const sql={
    list:'select * from board order by id desc',
    insert_board:'insert into board(writer, title, content,file_name, originalname,click,reg_date) value(?,?,?,?,?,?,?)'
    ,read:'select * from board where id = ?',
    check:'select * from user where name=?'
    ,plus : 'update board set click=click+1 where id=?'
    ,update : 'update board set writer=?, title=?, content=? where id=?',
    delete : 'delete from board where id=?'
    // ,search:'select * from board where ? like ?'
}

var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'mirim2',
	database: 'testdb'
};

var sessionStore = new MySQLStore(options);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.mimetype === "image/jpg" || file.mimetype === "image/png"){
            console.log("그림파일");
            cb(null,"uploads/img");
        }else{
            console.log("텍스트 파일");
            cb(null,"uploads/texts");
        }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }       // file.fieldname + '-' + Date.now()
  })
   
var upload = multer({ storage: storage })

// 날짜 formatting
const date = moment().format('YYYY-MM-DD HH:mm:ss');
// mysql 연동
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mirim2",
    database:"testdb"
})
conn.connect();

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));
app.use(methodOverrider('_method'));
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

app.use(session({
    secret: 'aowieidnfeiofjweo',     // id를 브라우저에 저장할 때 랜덤하게 암호해주는 것
    resave: false,                   // 사용자가 접속할 때마다 세션아이디를 새로 발급하느냐 아니냐를 결정하는 것
    saveUninitialized: true          // 사용자가 접속해서 세션을 사용전까지는 세션아이디를 발급하지 말아라
}))

app.get("/",(req,res)=>{
    res.send("<a href='/list'>List</a>");
     
 })
 
 app.get("/list",(req,res)=>{
     conn.query(sql.list,(err,data)=>{
         if(err) console.log(err);
         else{
             res.render("list",{lists:data});
         }
     })
 })
 
 app.get("/login",(req,res)=>{
     res.render("login");
 })
 
 app.post("/login",(req,res)=>{
     let _id= req.body.id;
     req.session.user=_id;
     console.log('logined');
     res.redirect("/list");
 })
 
 app.get("/logout",(req,res)=>{
     delete req.session.nickName;
     res.redirect('/list')
 })
 
 app.get("/new",(req,res)=>{
     if(req.session.user){
         res.render("new");
     }else{ 
         res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login"; </script>')
     }
     
 })
 app.post("/new",upload.single('image'),(req,res)=>{
     let _writer= req.body.writer;
     let _title = req.body.title;
     let _content = req.body.content;
     let _joinDate=date;
     let _file_name= req.file.path;
     let _originalname = req.file.originalname;
 
     conn.query(sql.insert_board,[_writer,_title,_content,_file_name,_originalname,0,_joinDate],(err)=>{
         if(err) console.log(err);
         else {
             console.log('inserted!');
             res.redirect("/list");
         }
     });
 })
 
 app.get("/show/:id",(req,res)=>{
     if(req.session.user){
         const paramId=req.params.id;
         conn.query(sql.plus,[paramId],(err)=>{
             if(err) console.log(err);
             else{
                 console.log('updated!');
             }
         })
         conn.query(sql.read,[paramId],(err,data)=>{
             if(err) console.log(err);
             else{
                 console.log(data);
                 res.render("show",{datas:data[0]});
             }
         })
     }else{
         res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login"; </script>')
     }
     
 })
 
 app.get("/check/:id",(req,res)=>{
     const paramId= req.params.id;
     res.render("check",{id:paramId});
 })
 
 app.post("/check/:id",(req,res)=>{
     const paramId=req.params.id;
     const session= req.session.user;
     let _password = req.body.password;
     conn.query(sql.check,[session],(err,data)=>{
         if(err) console.log(err);
         else{
             if(_password === data[0].password){
                 res.redirect("/edit/"+paramId);
             }else{
                 res.send("<h1>비밀번호가 틀렸습니다</h1>\n 뒤로 가셔서 비밀번호를 다시 입력해주세요.");
             }
         }
     })
 })
 
 app.get("/edit/:id",(req,res)=>{
     const paramId= req.params.id;
     conn.query(sql.read,[paramId],(err,data)=>{
         if(err) console.log(err);
         else{
             res.render("edit",{datas:data[0]});
         }
     })
 })
 
 app.put("/edit/:id",(req,res)=>{
     const paramId= req.params.id;
     let _writer= req.body.writer;
     let _title = req.body.title;
     let _content = req.body.content;
     conn.query(sql.update,[_writer,_title, _content,paramId],(err)=>{
         if(err) console.log(err);
         else{
             console.log('updated!');
             res.redirect("/");
         }
     })
 })
 
 app.delete("/delete/:id",(req,res)=>{
     const paramId= req.params.id;
     conn.query(sql.delete,[paramId],(err)=>{
         if(err) console.log(err);
         else{
             console.log('deleted !');
             res.redirect("/");
         }
     })
 })
 
 app.post("/search",(req,res)=>{
     let _category = req.body.category;
     let _keyword= req.body.keyword;
     let keyword="%" + _keyword + "%";
     
     // console.log(_category, _keyword);
     conn.query("select * from board where " + _category + " like '%" + _keyword + "%'" ,(err,data)=>{
         if(err) {
             console.log(err);
             return;
         }else{
             //console.log(data);
             res.send(data);
         }
         
     })
 })

app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})