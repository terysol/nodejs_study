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
    list:'select * from emp order by id desc',
    insert:'insert into emp(name, emp_number,email,reg_date)value(?,?,?,?) ',
    read:'select * from emp where id = ?',
    update : 'update emp set name=?, emp_number=?, email=? where id=?',
    delete : 'delete from emp where id=?'
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
            res.render('list',{lists:data});
        }
    });
    
})

app.get("/new",(req,res)=>{
    res.render("new");
})

app.post("/new",(req,res)=>{
    let _name= req.body.name;
    let _emp_number = req.body.emp_number;
    let _email = req.body.email;
    let _joinDate=date;

    conn.query(sql.insert,[_name,_emp_number,_email,_joinDate],(err)=>{
        if(err) console.log(err);
        else {
            console.log('inserted!');
            res.redirect("/");
        }
    });
})

app.get("/read/:id",(req,res)=>{
    const paramId=req.params.id;
    conn.query(sql.read,[paramId],(err,data)=>{
        if(err) console.log(err);
        else{
            console.log(data);
            res.render("read",{datas:data[0]});
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
    let _emp_number = req.body.emp_number;
    let _email = req.body.email;
    conn.query(sql.update,[_name,_emp_number, _email,paramId],(err)=>{
        if(err) console.log(err);
        else{
            console.log('updated!');
            res.redirect("/");
        }
    })
})

app.post("/delete/:id",(req,res)=>{
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