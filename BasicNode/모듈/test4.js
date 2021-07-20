module.exports={
    add:function(a,b){
        return a+b;
    },
    sub:function(a,b){
        let result=0;
        a>b ?  result= a-b :  result= b-a;
        return result;
    }
}