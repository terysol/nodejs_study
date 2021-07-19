/* 배열, 객체 ㄴ출력하기 */
// for - in
let user=["kim","lee","part"]
for(let i in user){
    console.log(i, user[i]);        // i는 index
}
console.log("-------------------------------");
// 객체는 key-value로 이루어짐
const obj = {
    name:"kang",
    age:30
}
for(let i in obj){
    console.log(i,obj[i]);
}

// for - of
console.log("-------------------------------");
const user2=["kim2","lee2","park2"];
for(let value of user2){
    console.log(value);     // for-of는 i만 찍어도 됨.
}

console.log("-------------------------------");
const str="hi javascript";
for(let value of str){
    console.log(value);
}

console.log("-------------------------------");
// forEach(콜백함수)            --> 배열의 함수, 객체x
let user3=["kim3","lee3","park3"];
user3.forEach(function(val,index){      // val : 값, index : 인덱스
    console.log(val,index);
})
