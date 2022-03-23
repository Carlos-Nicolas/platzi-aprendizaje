/*
nota : dejar de usar var para la declaracion de variables para evitar sobre escribir variables y evitar
errores con los menejos de variables en el codigo
*/

const fruits = () => {
    var fruit = ` apple`;
    console.log(fruit);
}

fruits();
/*
Al querer imprimir la variable nos muestra un error debido a que tiene un scope local 
*/
console.log(fruit);

const anotherFunction = () => {
    var x = 1;
    var x = 2;
    let y = 1;
    //let y=2;
    /* let y=2 genera un  errror por que estamos tratando de reasignarlos y con let no se puede reasignar 
    pero con var si se pueden reasignar variables*/
    console.log(x);
    console.log(y);
}

anotherFunction();