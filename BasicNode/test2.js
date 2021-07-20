// 모듈을 내보내는 코드
// 1. exports
// 2. module exports  : 객체만 내보내기

let calc={};
calc.add=(a,b)=>{
    return a+b;
}

module.exports=calc;    // 하나밖에 내보내지 못함

