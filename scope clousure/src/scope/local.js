const helloWorld = () => {
    // esta variable esta definida a valor local por que esta definida dentro de una arrow function //
    const hello = `Hello World`;
    console.log(hello);
};

helloWorld();


/*
ambito lexico: 
la funcionScope  de codigo primero se ejecuta lo que esta dentro por eso no
toma la variable global y en consola se imprime el valor locar
*/
var scope = `i am global`;

const functionScope = () => {
    var scope = `i am just a local`;
    const func = () => {
        return scope
    }
    console.log(func());
};

functionScope();