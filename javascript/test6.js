let user=[
    {name:"kim",age:30 },
    {name:"lee",age:25},
    {name:"park",age:27}
]
console.dir(user);    // --> user 객체의 구조

user.push(
    {name:"kang",age:25}
);
console.log(user.length);

user.pop();
console.log(user.length);

user.unshift(       // 맨 앞에 추가
    {name:"ko",age:40}
);
console.log(user.length);

user.shift();
console.log(user.length);

delete user[1];
console.log(user.length);

user.forEach(function(val){
    console.log(val);
})