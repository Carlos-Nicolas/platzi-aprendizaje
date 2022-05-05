# Introducción

TypeScript es un superset de JavaScript que añade tipos a nuestras variables ayudando así a la detección de errores de forma temprana y mejorando el autocompletado.

Los navegadores no entienden TypeScript así que lo vamos a transpilar a JavaScript usando Parcel.

## Tipos básicos

- boolean. Valor verdadero o falso.

- number. Números.

- string. Cadenas de texto.

- string[]. Arreglo del tipo cadena de texto.

- Array. Arreglo multi-tipo, acepta cadenas de texto o números.

- enum. Es un tipo especial llamado enumeración.

- any. Cualquier tipo.

- object. Del tipo objeto.
## ejemplos

### Boolean
```ts
let muted : boolean = true ;
```
### Number
```ts
let numerador: number = 10 ;
let  divisor : number = 2 ;
let resultado = numerador / divisor;
```
### String
```ts
let nombre: string = "Carlos";
let saludo =`me llamo ${nombre}`;
```
### Arreglos
```ts
//todos los objetos de este arroeglo deben ser strings sin exepcion alguna
let people : string[] = [];

people ['astrid',"cruz"]

// este arreglo acepta strings y numeros 
let peopleAndNumbers :Array< string | number > = [];
```
### Enum
```ts
//congunto de variables determinadas
enum Color {
    Rojo ="Rojo",
    Verde="Verde",
    Azul="Azul",
};

let colorFavorito  : Color = Color.Rojo ;
console.log(`mi color favorito es ${ colorFavorito }`);
```
### Any
```ts
// se utuliza cuando no sabemos que tipo de variable  se va a utilizar
let comodin : any = "jocker";
comodin = { type: 'wildcard'};
 
 ```
 ### Object
 ```ts
let algunObjeto : object = { type: 'wildcard'};
```

# Funciones 

En Typescript podemos ser explícitos con el tipo de los argumentos y el tipo de retorno de una función.

```js
//se espera que la respuesta de la funcion sea un numero
function add(a:number, b:number): number {
    return  a+b;
}
```
```ts
// la respuesta de la funcion es otra funcion "(param) => param ";
function createAdd (a:number): (number) => number {
    returt function (b:number){
        return b+a;
    }
}
```
```ts

// con el ? indicamos que el segundo parametro es opcional para la funcion 
function fullName(firstName:string,lastName?:string):strig{
    return `${firstName}${lastName}`;
}

const carlos = fullname('carlos');
console.log(carlos);

// agregamos un valor por defaul despues del tipado
function fullName2(firstName:string,lastName?:string = 'smith'):strig{
    return `${firstName}${lastName}`;
}

const carlos2 = fullName2('carlos');
console.log(carlos2);
```

# Interfaces

Nos permiten declarar la forma exacta de un objeto, definiendo los tipos de sus propiedades y si son opcionales o no.
