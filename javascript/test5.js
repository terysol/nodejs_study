/* 객체  */
// 객체의 인덱스는 문자열
// const user={
//     kim:10,
//     lee:3,
//     part:25
// }

// 2. new 연산자 사용
const user = new Object();      // const user={};
user.kim=10;
user.lee=25;
user['part']=4;
console.log(user);

// 3. 프로토타입 이용한 생성
// java에서의 class를 프로토타입이라고 생각
function Person(name,age){      // 생성자 함수 
    this.name=name;
    this.age=age;
}       // 프로토타입 : 함수임

// person의 관련된 함수를 만드는 방법
Person.prototype.walk = function(){
    console.log("걷기");
}

let person1 =  new Person("kim",90);
let person2 =  new Person("lee",100);
console.log(person1.name, person2.name);
person1.walk();
// 객체를 만들면 프로토타입이 자동으로 만들어진다.

console.log("------------------------------");
const score={
    kor:100,
    eng:90,
    math:80
}

const score2=new Object();
score2.kor=100;
score2['eng']=90;
score2.math=80;

function Score(kor,eng, math){
    this.kor=kor;
    this.eng=eng;
    this.math=math;
}
Score.prototype.sum1=function(kor,eng,math){
    let sum = kor+eng+math;
    console.log(sum);
}
let score1= new Score(100,80, 90);
console.log(score1);
score1.sum1(score1.kor,score1.eng,score1.math);
