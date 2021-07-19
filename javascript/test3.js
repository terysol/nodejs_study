/* var */
var sum=0;
for(var i=1;i<=10;i++){
    sum+=i;
}

console.log("sum", sum);    // 55
console.log("i", i)         // 11
console.log("-----------------------------");

/** function 함수 */
function foo(){
    var sum=0;      // var는 함수 단위
    for(var i=1;i<=10;i++){
        sum+=i;
    }
}
foo();
console.log("sum", sum);    // error
console.log("i", i)         // error


/* let */
let sum=0;
for(let i=1;i<=10;i++){
    sum+=i;
}
console.log("sum", sum);        // 0
console.log("i", i)         // error