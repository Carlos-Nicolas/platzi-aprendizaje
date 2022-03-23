/*
scope : alcanze de variable
variable declarada global por que no se encuentra dentro de ningun bloque  o funcion */
var hello = `hello`;

let world = `world`;

const helloWorld = `Hello world`;

const anotherFunction = () => {
    console.log(hello);
    console.log(world);
    console.log(helloWorld);
}
anotherFunction();