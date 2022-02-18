# JavaScript
## foreach

recorre los elementos de un array
```sh
let letters = ["a","b","c"];
```
foreach
```sh
letters.foreach(item=>console.log(item))
```
Lo que susede unternamente es:

```sh
for (let index = 0 ; index < letters.length; index ++){
    const element = letters[index];
    console.log(element)
}
```
## Map

itera(recorre) un array y crea uno nuevo el nuevo array puede mutar.
siempre va atener el mismo numero de elementos que el array original

```sh
let letters = ["a","b","c"];
```

```sh
let letters2 = letters.map(item => item+"+");
```

### resultado
```sh
letters2 = ["a+","b+","c+"];
```

## filter 

Regresa igual o menos  numeros de objetos en un array  y solo los que cumplan con la condicional

```sh
const words =["limit","elite","exuberant"];
```
lo que pasa internamente es:
```sh
const newArray[];
 for (let index = 0 ; index < words.length; index ++){
    const element = words[index];
    if (element.length > = 6){
        newArray.push(item);
    }
}
```
como quedaria con el metodo filter:
```sh
const rta = words.filter(item => item.length >=6)
```

## Reduce

reduce como su nombre lo indica a un solo dato 
se le deben de pasar dos parametros a esta funcion una funcion y un acumulador que va a indicar cual va a ser el parametro con el que va a iniciar  puede ser un 0,{},[].

```sh
const totals = [1,2,3,4];
```
 lo que pasa internamente :

 ```sh
 let sum = 0 ;

  for (let index = 0 ; index < totals.length; index ++){
    const elements = totals[index];
    sum = sum + element;
}
 ```

como queda con la funcion:

```sh
cons rta = totals.reduce((sum,element) => sum + element , 0);

```
## flat

convierte una  coleccionde arrays en un solo array dependiendo de la profundidad que se le indique

```sh

 let colection = [1,2,[3,4],5,6,7];
 ```
a plicando el metodo flat para unir el array interno y dejar solo un array dependiendo del nivel de excabacion se le va a indicar en los parentecis a la funcion.


```sh
 let aplanado = colection.flat();
```
### resultado

```sh

aplanado =[1,2,3,4,5,6,7];

```

## concat

hay que recordad que la concatenacion es solamente la union de dos objeto pueden ser dos strings o un string y una varable la forma mas comun de ver  una concatenacion  es con el simbolo de "+".

```sh
const array1 = [1,2,3];
let array2 = [4,5,6];
```

aplicacion de concat.

```sh
 let arrayTotal = array1.concat(array2);
```

### resultado

```sh
arrayTotal =[1,2,3,4,5,6]
```


