const express =require('express');
const fs = require('fs');
const app = express();

app.use(express.static(__dirname,+'/public'));
app.set('views','./views');
app.set('view engine','pug');
app.locals.pretty = true;

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Let's go to INDEX");
})
app.get("/lang",(req,res)=>{
    res.render('list_form');
})
app.post("/lang",(req,res)=>{
    let _title = req.body.title;
    let _description = req.body.description;

    fs.writeFile('./data/'+_title,_description,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("saved!!");
            fs.readdir('./data',(err,files)=>{
                if(err){
                    console.log(err);
                }else{
                    //files는 모든 파일들이 들어가있다.
                    //매개변수 넘길때는 리스트로 넘겨준다 
                    res.render("list_form",{lists:files,title:'welcome',description:'hello'})
                    //index.pug 실행 lists , title, description
                }
            })
        }
    })
})

app.get('/lang/:id',(req,res)=>{
    const param =req.params.id;
    fs.readdir('./data/',(err,files)=>{
        if(err) console.log(err);
        else{
            // 파일의 내용 가지고 오기
            fs.readFile('./data/' + param,'utf8',(err,data)=>{
                if(err) console.log(err);
                else{
                    res.render('list_form',{title:param,lists:files,desc:data});
                }
            })
        }
    })
})
app.listen(3000,()=>{
    console.log("Running Express Server at localhost...");
})