const express = require("express");
const mysql = require("mysql");
const format = require("date-format");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const port = 5000; 
const app = express();

// mysql 연동
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mirim2",
    database:"testdb"
})
conn.connect();

// 쿼리를 객체로 생성
const sql={
    list:'select * from user order by id desc',
    insert:'insert into user(name, password, email, reg_date)value(?,?,?,?) ',
    read:'select * from user where id = ?',
    update : 'update user set name=?, email=?where id=?',
    delete : 'delete from user where id=?'
}

app.use(express.static(__dirname + "/public"));  
app.use(express.urlencoded({extended : true}));

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'ejs')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기

// 날짜 formatting
const date = moment().format('YYYY-MM-DD HH:mm:ss');

app.get("/",(req,res)=>{
    conn.query(sql.list,(err,data)=>{
        if(err) console.log(err);
        else{
            res.render("main",{lists:data});
        }
    })
})

app.get("/new",(req,res)=>{
    res.render("new");
})

app.post("/new",(req,res)=>{
    let _name= req.body.name;
    let _password = req.body.password;
    let _email = req.body.email;
    let _joinDate=date;

    conn.query(sql.insert,[_name,_password,_email,_joinDate],(err)=>{
        if(err) console.log(err);
        else {
            console.log('inserted!');
            res.redirect("/");
        }
    });
})

app.get("/read/:id",(req,res)=>{
    const paramId= req.params.id;
    conn.query(sql.read,[paramId],(err,data)=>{
        if(err) console.log(err);
        else{
            res.render("read",{datas:data[0]});
        }
    })
})

app.get("/check/:id",(req,res)=>{
    const paramId= req.params.id;
    res.render("check",{id:paramId});
})

app.post("/check/:id",(req,res)=>{
    const paramId= req.params.id;
    let _password = req.body.password;
    conn.query(sql.read,[paramId],(err,data)=>{
        if(err) console.log(err);
        else{
            if(_password === data[0].password){
                res.redirect("/edit/"+data[0].id);
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

app.post("/edit/:id",(req,res)=>{
    const paramId= req.params.id;
    let _name= req.body.name;
    let _email = req.body.email;
    conn.query(sql.update,[_name, _email,paramId],(err)=>{
        if(err) console.log(err);
        else{
            console.log('updated!');
            res.redirect("/");
        }
    })
})

app.get("/delete/:id",(req,res)=>{
    const paramId= req.params.id;
    conn.query(sql.delete,[paramId],(err)=>{
        if(err) console.log(err);
        else{
            console.log('deleted !');
            res.redirect("/");
        }
    })
})
app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})