lista1 = [100,200,300,400];

let calcularPromedio = (lista1) =>{
    lista1.reduce((valorAcumulado = 0, nuevoElemento )=> valorAcumulado + nuevoElemento)

}

console.log(calcularPromedio(lista1));