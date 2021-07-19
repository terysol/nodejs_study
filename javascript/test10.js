// let callTimes=(callback)=>{
//     for(var i=0;i<5;i++){
//         callback();
//     }
// }

// let testB=()=>{
//     console.log('testB()함수');
// }

// callTimes(testB);

// callTimes(()=>{
//     console.log('testB()함수 ');
// })

let add=(a,b,cb)=>{
    d=a+b;
    cb(d);
}

add(10,20,(d)=>{
    console.log(d);
})

false.readFile("data.txt",function(err,result){
    console.log(result);
})
