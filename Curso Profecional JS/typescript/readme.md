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

```ts
enum Color {
  Rojo = 'Rojo',
  Verde = 'Verde',
}
//con el signo de "?" le indicamos que esa propiedad es opcional
interface Rectangulo {
  ancho: number;
  alto: number;
  color?: Color;
}
 //indicamos como tipado el nombre de la interfas para que sepa a que esta enlazado 
let rect: Rectangulo = {
  ancho: 4,
  alto: 6,
  // color: Color.Rojo,
};

function area(r: Rectangulo): number {
  return r.alto * r.ancho;
}

const areaRect = area(rect);
console.log(areaRect);

rect.toString = function() {
  return this.color ? `Un rectangulo ${this.color}` : `Un rectangulo`;
};

console.log(rect.toString());
```

# Clases

# Patrones

- **Creacionales.** Proveen diferentes mecanismos para crear objetos.

- **Estructurales.** Describen formas de componer objetos para formar nuevas estructuras flexibles y eficientes.

- **De Comportamiento.** Gestionan algoritmos y responsabilidades entre objetos.

## Patron Singleton 

Singleton es un patrón de diseño creacional que nos permite asegurarnos de que una clase tenga una única instancia, a la vez que proporciona un punto de acceso global a dicha instancia.

```ts

 class Singleton{
    private static  instance :Singleton{
        private constructor(){
            //inicialisacion
        }
        // aqui creamos la intancia del singleton y solo  se puede crear aqui por que estamos dentro de la misma clase.
        static getInstance(){
            if(!Singleton.instance){
                Singleton.instance = new Singleton()
            }
            return Singleton.instance;
        }
    }
}

export default Singleton ;
```

## Patron Observer

**Observer** es un patrón de diseño de comportamiento que te permite definir un mecanismo de suscripción para notificar a varios objetos sobre cualquier evento que le suceda al objeto que están observando.


```ts
interface observer{
    update (data: any)=>void,
}

interface Subject {
suscribe: (observer: Observer) => void,
unsubscribe: (observer: Observer) => void, ;
}

class BitcoinPrice implements Subject {

    observers: Observer[] = [] ;

    suscribe (observer: Observer ){
        this.observers.push(observer);
    },
    
    unsusbcribe (observers: Observer){
        const index =this.observers.findIndex(obs => {
        return obs === observer 
        })
        this.observers.splice(index,1);
    }

    notify ( data: any ){
        this.observers.forEach(observer => observer.update(data))
    }
}

```
