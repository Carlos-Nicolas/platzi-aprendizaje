# String interpolation
String interpolation es la manera de enviar datos desde nuestro componente hacia la vista. Utilizando el doble símbolo de llaves {{ }}, o también conocidos como brackets, puedes imprimir el valor de una variable, realizar operaciones matemáticas o hacer el llamado a una función dentro del código HTML.
```sh
<h1>{{ 'Hola Platzi' }}</h1>
<h2>1 + 1 = {{ 1 + 1 }}</h2>
<h3>{{ myFunction(); }}</h3>
```
# División de responsabilidad
Un componente de Angular se divide en tres archivos: uno para el código TypeScript, otro para el código HTML y uno más para el código CSS.
```sh
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hola soy Platzi';
}
```
Angular usa el concepto de decoradores para modificar el comportamiento de las clases. La clase AppComponent implementa el decorador @Component() para indicarle a Angular que esta clase será un componente. Dentro de este decorador, puedes observar el selector del componente (un nombre para el mismo), el template HTML y la hoja de estilos que usará.

Finalmente, dentro de la clase puedes declarar tus propiedades y métodos como en cualquier clase de la programación orientada a objetos. Tenemos una propiedad llamada title que es del tipo string. Podemos mostrar el valor de esta variable en el HTML con una interpolación:
```sh
<p>{{ title }}</p>
```
Es importante que tengas en cuenta la visibilidad de los atributos y métodos de una clase. Si estos llegaran a ser private, no podrás usarlo en el HTML Las variables deben ser públicas para poder ser compartidas al template.

```sh
...
export class AppComponent {
  // Variable privada, no puede utilizarse en un interpolación
  private title = 'Hola! soy una variable privada';
}
```

# Property Binding
Property Binding es la manera que dispone Angular para controlar y modificar las propiedades de los distintos elementos de HTML. Para esto, simplemente utiliza los corchetes `[]` para poder modificar dinámicamente ese atributo desde el controlador.

## Utilidades
- El atributo `src` de la etiqueta `<img>` para modificar dinámicamente una imagen.
- El atributo `href` de un `<a>` para modificar un enlace.
- El atributo `value` de un `<input>` para autocompletar un valor de un formulario.
- El atributo `disable` de un `<input>` para habilitar/deshabilitar un campo de un formulario.


Si tienes en tu componente:
```sh
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  empresa = 'Platzi';
  habilitado = true;
}
```
Puedes modificar el value de un campo de un formulario de la siguiente manera:
```sh
<input [value]="empresa" [disabled]="habilitado"  />
```
Se imprime el valor de la propiedad `empresa` como valor de un `<input>` y gracias a la variable `habilitado` controlas la edición del campo.


# Introducción al Event Binding

A lo igual que el Property Binding nos permite modificar el valor de los atributos de los elementos HTML desde el controlador, el `Event Binding` permite controlar los eventos que suceden en estos elementos. El clic de un botón, detectar cambios en un campo, el envío de un formulario, entre otros eventos. Para esto utiliza los paréntesis `()` para el bindeo de la propiedad del elemento.

Si tienes en tu componente:
```sh
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  enviarFormulario() {
    // ...
  }
}
```
Puedes ejecutar el método enviarFormulario() cuando se realiza un clic en un botón de la siguiente manera:
```sh
<button (click)="enviarFormulario()" >
```
# Data binding 

El atributo **ngModel permite el intercambio de datos de forma bidireccional** entre el componente y la vista. Lo que suceda en el componente, se verá reflejado en la vista. Lo que se suceda en la vista, inmediatamente impactará en el componente.
```sh
<input [(ngModel)]="name">
```
ngModel usar tanto los corchetes `[]` como los paréntesis `()`. De esta manera, se vuelve bidireccional el intercambio de datos. Si no quieres la bidirección, solo colocamos los corchetes `[ngModel]` para que la comunicación sea unidireccional.Para utilizar ngModel, es necesario hacer uso e importar **Angular Forms**. Para esto, dirígete al archivo `app.module.ts` que es el módulo principal de toda aplicación Angular y agrega lo siguiente:

```sh
...
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ... ],
  imports: [
    FormsModule
  ],
  providers: [],
  bootstrap: [ ... ]
})
export class AppModule { }
```

De esta manera puedes importar el módulo `FormsModule` desde `@angular/forms` y agregarlo a `imports` para emplear la propiedad `[(ngModel)]`.


# ngif

El condicional `“If”` es un `“If”` en Javascript, en Java, en PHP, en Python o en cualquier lenguaje. Angular posibilita utilizar este condicionante embebido en el HTML para mostrar o no un elemento. Su sintaxis es algo particular, está compuesta por un asterisco seguido de las iniciales características de Angular `“ng”` y la palabra `“If”`.

```sh
<div *ngIf="isPlatzi">Hola, soy Platzi</div>
```

Si la condición dentro del `“If”` se cumple, se mostrará el `<div>` con el respectivo contenido dentro. De lo contrario, el usuario no verá dicho elemento en el navegador. En la condición del If `puedes colocar cualquier operador lógico`:

(img)[https://static.platzi.com/media/user_upload/tabla-angular-6ed53829-7208-48e7-8ac1-eb91be5306f2.jpg]

# If … else
Para usar un `else` en Angular, la sintaxis es algo especial. Debes crear un template en tu código HTML usando la etiqueta que provee Angular llamada `<ng-template>` con una `Variable de Template`, comenzando con `#`, para hacer referencia a este elemento desde tu `If`.

```sh
<div *ngIf="isPlatzi; else templateElse">Hola, soy Platzi</div>
<ng-template #templateElse>
    <div>No soy Platzi</div>
</ng-template
```

Si la condición del `If` no se cumple, **seguido de punto y coma**, se coloca la sentencia **else** haciendo referencia a `templateElse`, que es el nombre de la variable del template a mostrar en su lugar.

Aporte creado por: Kevin Fiorentino.


# *ngFor

A lo igual que con un `If`, Angular permite `iterar` un array de números, de cadenas de caracteres o de objetos usando **“*ngFor”**.Si tienes en tu componente un array de datos:
```sh
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myArray: string[] = [
    'Platzi',
    'es',
    'genial!'
  ];
}
```
Puedes mostrar cada elemento iterando el array en un elemento HTML:


```sh    
"let str of myArray">
        {{ str }}
    </li>
>
```
El `*ngFor` crea una variable temporal llamada `str` (o el nombre que más te guste) que contiene cada valor de `myArray`. Finalmente, utilizando una interpolación, muestras el valor de **str**.Quedando tu HTML de la siguiente manera:
```sh
<li>Platzili><li>esli><li>genial!li>ul>
```
## Índice de iteración
- `ngFor` también cuenta con un `índice `con el número de iteraciones. Puedes acceder a este número agregando al **`ngFor index as i`** de la siguiente manera:

```sh
"let str of myArray; index as i">
        {{ i }}. {{ str }}
    </li>
>

```
Cada iteración contiene una variable `i` con el índice que le corresponde. Iniciando desde cero, da como resultado:
```sh
<ul>
    <li>0. Platzi </li>
    <li>1. es </li>
    <li>2. genial </li>
</ul>
```

# *ngFor para arrays

Puedes utilizar `*ngFor` para iterar y mostrar cada propiedad de un objeto. Considera que en el componente tienes un array de objetos que representan a una persona:

```sh
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  peopleArray = [
    {
        firstname: 'Freddy',
        lastname: 'Vega',
        age: 35
    },
    {
        firstname: 'Nicolas',
        lastname: 'Molina',
        age: 29
    },
    {
        firstname: 'Ángela',
        lastname: 'Ocando',
        age: 30
    }
  ];
}
```

Itera este array en el HTML e imprimimos el valor de cada propiedad de la siguiente manera:

```sh
<ul *ngFor="let person of peopleArray">
    <li>Nombre: {{ person.firstname }}</li>
    <li>Apellido: {{ person.lastname }}</li>
    <li>Edad: {{ person.age }}</li>
</ul>
```


La variable `person` guarda temporalmente el objeto en cada iteración, pudiendo acceder a cada valor usando un **punto seguido del nombre de la propiedad**.

## Tipado de objetos con interfaces

El array `peopleArray` puede contener cualquier cosa, y puede ocasionar comportamientos indeseados en tu aplicación. Puedes crear una interfaz de Personas para tipar los objetos del array y asegurar que todos tengas las mismas propiedades.

```sh
interface Person {
    firstname: string;
    lastname: string;
    age: number
}
```

Tipando el array de la siguiente manera para indicar que el array es de objetos del tipo Persona:

```sh
...
peopleArray: Person[] = [
    {
        firstname: 'Freddy',
        lastname: 'Vega',
        age: 35
    },
    ...
 ]
```
