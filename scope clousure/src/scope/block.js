


const fruits = () => {
if (true){
    var fruits1 = `apple`;
    let  fruits2 = `banana`;
    const fruits3 = `kiwi`;
}
console.log(fruits1);
console.log(fruits2);
console.log(fruits3);

/*
en esta impreciones de pantalla solo se muestra fruits1 debido a que es de escope local es decir esta
disponible dentro de toda la funcion, frits2 y fruits3 no se imprimen en pantalla debido al scope de 
bloque.
tip: el scope de bloque una forma facil de detectar el bloque es por las llaves "{}" todo lo que este 
dentro de esas llaves es un bloque. 
*/
}

fruits();