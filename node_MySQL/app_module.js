const express = require("express");
const mysql = require("mysql");
const port = 5000; 
const app = express();

const indexRouter = require('./routes/index');

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
app.use('/',indexRouter);       // /를 포함하여 접근할때 indexRouter를 실행 해라

app.set('views', './views')
// 나는 view를 사용하겠다. 
app.set('view engine', 'ejs')       // 나는 pug를 사용
app.locals.pretty=true;     // pug 이쁘게 만들기



app.listen(port,()=>{
    console.log(`Connecting to ${port}`);
})