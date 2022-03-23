/**
 * 
 el ambito lexico son las funciones que se ejecutan ulizando
la cadena del alcance donde estaba vijente en en su momento
es decir que se tiene el valor de count que esta declarado en la funcion principal
pero esta accecible dentro de siguiente funcion
 * 
 */
const buildCount = (i) => {
    let count = i;
    const dispayCount = () => {
        console.log(count++);
    };
    return dispayCount;
};

const mycount = buildCount(1);
mycount();
mycount();
mycount();


/*
estamos creando otro closure 
*/
//aqui tenemos un nuevo closure, un nuevo alcance, un nuevo ambito.
const myOtherCount = buildCount(10);
myOtherCount();
myOtherCount();