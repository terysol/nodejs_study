const express = require("express");
const mysql = require("mysql");
const format = require("date-format");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");


const router=express.Router();      // router 객체
// 날짜 formatting
const date = moment().format('YYYY-MM-DD HH:mm:ss');

router.get("/",(req,res)=>{
    conn.query(sql.list,(err,data)=>{
        if(err) console.log(err);
        else{
            res.render('list',{lists:data});
        }
    });
    
})

router.get("/new",(req,res)=>{
    res.render("new");
})

router.post("/new",(req,res)=>{
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

router.get("/read/:id",(req,res)=>{
    const paramId=req.params.id;
    conn.query(sql.read,[paramId],(err,data)=>{
        if(err) console.log(err);
        else{
            console.log(data);
            res.render("read",{datas:data[0]});
        }
    })
})

router.get("/edit/:id",(req,res)=>{
    const paramId= req.params.id;
    conn.query(sql.read,[paramId],(err,data)=>{
        if(err) console.log(err);
        else{
            res.render("edit",{datas:data[0]});
        }
    })
})

router.post("/edit/:id",(req,res)=>{
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

router.post("/delete/:id",(req,res)=>{
    const paramId= req.params.id;
    conn.query(sql.delete,[paramId],(err)=>{
        if(err) console.log(err);
        else{
            console.log('deleted !');
            res.redirect("/");
        }
    })
})

module.exports=router;