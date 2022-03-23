/*
el hoisting es la elebacion de las variables o funciones al mometo que se compilan nuestro codigo
en las siguientes lineas lo que pasa es que el hoistint sube la declaracion de "a" 
y despues se genera la asignacion
*/

a =2;
var a;
console.log(a);//2

/*
lo que pasa en el hoisting
var a;
a = 2;
console.log(a)
nota: lo que creemos como desarrolladores es que vamos creando variables como las vamos usando
pero esto es la mitad de la verdad debido  que cuando se compila el codigo lo primero que pasa es 
que se crean las variables y despues las asignaciones esto pasa igual con las funciones 
y las funciones anonimas
*/