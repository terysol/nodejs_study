// function add(num1, num2){
//     return num1+num2;
// }
// console.log(add(3,5));

/* 익명함수 */
let add=function(num1, num2){
    return num1+num2;
}
console.log(add(3,5));

let plus=function(n,m){
    let sum=0;
    for(let i=n;i<=m;i++){
        sum+=i;
    }
    return sum;
}

let check=function(n){
    if(n % 2===0){
        return "짝수";
    }else{
        return "홀수";
    }
}

const person={
    name:"kim",
    age:30,
    add:function(x,y){
        return x+y;
    }
}
console.log(person.add(3,5));

const person2={
    list:{kim:30,lee:28, park:35},
    show:function(){
        console.log("hi hello");
    }
}
person2.show();