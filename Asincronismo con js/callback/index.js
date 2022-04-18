// callback: funcion pasada a otra fnucion por parametro

function sum (num1,num2){
return num1 + num2
}
function calc (num1,num2,callback){
    return callback (num1, num2);
}

console.log(clac(1,2,sum));