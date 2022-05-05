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

```ts
//boolean
let muted : boolean = true ;

//numeros

let numerador: number = 10 ;
let  divisor : number = 2 ;
let resultado = numerador / divisor;

//string

let nombre: string = "Carlos";
let saludo =`me llamo ${nombre}`;

// arreglos 
//todos los objetos de este arroeglo deben ser strings sin exepcion alguna
let people : string[] = [];

people ['astrid',"cruz"]

// este arreglo acepta strings y numeros 
let peopleAndNumbers :Array< string | number > = [];

//Enum 
//congunto de variables determinadas
enum Color {
    Rojo ="Rojo",
    Verde="Verde",
    Azul="Azul",
};

let colorFavorito  : Color = Color.Rojo ;
console.log(`mi color favorito es ${ colorFavorito }`);

//Any 
// se utuliza cuando no sabemos que tipo de variable  se va a utilizar
let comodin : any = "jocker";
comodin = { type: 'wildcard'};
 
//Object

let algunObjeto : object = { type: 'wildcard'};

```

# funciones 

En Typescript podemos ser explícitos con el tipo de los argumentos y el tipo de retorno de una función.