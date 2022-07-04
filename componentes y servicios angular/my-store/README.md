# ¿Qué son los componentes?

Un componente es una pieza de software con una **responsabilidad única** y una **estructura y funcionalidad determinada**, además de ser **reutilizable**. Es una forma de dividir tu aplicación de una forma escalable para no tener TODO en un solo archivo. Por ejemplo, un componente para el header, otro para el footer, uno más para el menú, etc.

# Componentes en Angular

Puedes crear tu primer componente en Angular utilizando el comando `ng generate component test-name` o en su forma corta `ng g c test-name`. Esta acción creará los siguientes archivos:

- **my-test-name.component.html**
- **my-test-name.component.ts**
- **my-test-name.component.css**
- **my-test-name.component.spec.ts**


Observa el archivo `.html` que será el template que tu componente utilizará. El archivo `.ts` que contiene el código TypeScript y la lógica. El archivo `.css` que contiene los estilos. Si escogiste trabajar con un preprocesador de CSS, este archivo puede ser `.scss`, `.sass` o `.less`. Finalmente, el archivo más extraño, `.spec.ts` que contiene el código de las pruebas unitarias que puedes escribir para automatizar el testing en tu componente.

Angular también importará automáticamente el componente creado en el archivo `app.module.ts` para que automáticamente puedas utilizarlo en tu aplicación.

```sh
...
import { TestNameComponent } from './test-name/test-name.component';

@NgModule({
  declarations: [
    ...
    TestNameComponent
  ],
  imports: [ ... ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```



# Partes de un componente Angular


El archivo con la extensión `.ts` es el principal de cualquier componente Angular.
```sh
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.scss']
})
export class TestNameComponent {
    ...
}
```

Observa lo más importante, el decorador `@Component()`. Los decoradores **alteran el comportamiento** de una clase en Angular para que el compilador de TypeScript interprete el código de la manera correcta y sepa que una clase es un componente, un módulo, un servicio, una directiva, etc. Este decorador es quién enlaza el componente con el archivo HTML y la hoja de estilos, además de otorgarle al componente un selector o un nombre para emplearlo en tus templates.

# Uso de Inputs

Para comunicar componentes, Angular hace uso de decoradores para **intercambiar información** entre un componente padre hacia un componente hijo y viceversa.


##  Comunicando componentes

Para enviar información de padre a hijo, puedes utilizar el decorador `@Input()` para marcar una propiedad de una clase como punto de entrada de un dato.

```html
<p style=‘text-align:center;’>
<img src=“https://cdn.document360.io/da52b302-22aa-4a71-9908-ba18e68ffee7/Images/Documentation/Screenshot from 2022-04-05 22-42-58.png” alt=“Envio de datos componente padre a hijo”>
</p>
```

```js
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.less']
})
export class TestNameComponent {

  @Input() firstname: string;

  constructor() { }
}
```

Debes importar `Input` desde `@angular/core` para poder utilizar esta directiva e indicar que la propiedad `firstname` es un dato que el componente padre enviará.

Podrás inicializar el componente desde su padre y pasarle los inputs que este necesite de la siguiente manera:

```html
<app-test-name>
    firstname="Platzi"
</app-test-name>
```

También puedes cambiar el nombre el Input especificando el nombre de la propiedad que quieras que este utilice al inicializar el componente.

```sh
...
    @Input('my-name') firstname: string;
...
```

```html
<app-test-name>
    my-name="Platzi"
</app-test-name>
```

## Data binding en Inputs

El decorador `@Input()` detectará cualquier cambio en el dato y automáticamente actualizará su valor. Si ocurre algún evento en el componente padre que cambie el valor en el Input `firstname`, el componente hijo recibirá inmediatamente ese nuevo valor.

## Input Set

Otra manera de utilizar la directiva `@Input` es de la siguiente manera:

```sh
    @Input() set saludar(firstname: string) {
        console.log('Hola', firstname)
    };
```

Observa que en esta oportunidad, cada vez que se envía un valor al `@Input`, se ejecutará la función `saludar()` que recibe como parámetro el valor que se le haya enviado.

De esta manera, puedes ejecutar la lógica que necesites dentro de esta función cada vez que el valor del `@Input` cambia.


# Uso de Outputs

Así como el decorador `@Input` permite el envío de información desde un componente padre hacia un componente hijo, el uso de `@Outputs` permite lo contrario.

## Comunicación hijo a padre

A partir de la emisión de un evento, el decorador `@Output()` **permite enviar mensajes desde un componente hijo hacia el padre.**

## Envío del mensaje

Para esto, se hace uso de la clase `EventEmitter` importándola desde `@angular/core`, para crear en tu componente una propiedad emisora de eventos.

```js

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.less']
})
export class TestNameComponent {

  @Output() message = new EventEmitter<string>();

  constructor() { }
}
```


Decorando la propiedad con el `@Output()` y creando una instancia de `EventEmitter` podrás emitir un evento de la siguiente manera:

```js
...
    eventEmitter() {
        this.message.emit('Hola soy Platzi');
    }

```


Llamando al método `emit()` de la instancia `EventEmitter`, se enviará el valor al componente padre que se encuentre escuchando el evento.

## Recepción del mensaje

Desde el componente padre, inicializa el componente hijo de la siguiente manera:

```html
<app-test-name>
    (message)="recibirMensaje($event)"
</app-test-name>

```

Se “bindea” la propiedad emisora de eventos con '()' y se le pasa una función que se ejecutará cada vez que emita un evento.
Y en el componente padre:


```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.less']
})
export class FatherComponent {

  constructor() { }
  
  recibirMensaje(event: Event) {
    console.log(event);
  }
}
```

La función `recibirMensaje()` posee un parámetro del tipo `Event` que contendrá el mensaje del componente hijo.


## Comunicando componente padre a hijo

Un ejemplo real para el uso de la comunicación entre **componente** podría ser para renderizar N cantidad de productos de un catálogo.

**Paso 1:** Comienza creando una interfaz para tipear el modelo de datos del Producto:

```js
// interfaces/producto.interface.ts
export interface Producto {
    id: number;
    name: string;
    precio: number;
    image: string;
}
```

**Paso 2:** Luego, impórtala en el componente Catálogo que será el componente padre en la comunicación.

```js
// components/catalogo/catalogo.component.ts
import { Component } from '@angular/core';
import { Producto } from './producto.interface.ts';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {

  public productos: Producto[] = [
    {
        id: 1,
        name: 'Automobil de juguete',
        precio: 100,
        image: './image1.jpg'
    },
    {
        id: 2,
        name: 'Muñeca de trapo',
        precio: 180,
        image: './image2.jpg'
    },
    {
        id: 3,
        name: 'Pelota de futbol',
        precio: 120,
        image: './image3.jpg'
    }
  ];
}
```

**Paso 3:** Este componente posee un array de productos para iterar en el HTML inicializando el componente `<app-producto>` por cada objeto en el array.

```js
<!-- components/catalogo/catalogo.component.html -->
<app-producto *ngFor="let p of productos"
    [producto]="p"
></app-producto>
```


**Paso 4:** Finalmente, el componente hijo recibe el producto haciendo uso del decorador `@Input()` y apoyándose también de la interfaz para tipear los datos.

```js
// components/producto/producto.component.ts
import { Component, Input } from '@angular/core';
import { Producto } from './producto.interface.ts';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {

  @Input() producto: Producto;
}
```

Pudiendo mostrar la información del producto en el template del componente hijo:

```html
<!-- components/producto/producto.component.html -->
<div>
    <h2>{{ producto.name }}</h2>
    <img [src]="producto.image">
    <p>Precio: {{ producto.precio }}</p>
</div>
```
Será habitual tener la necesidad en tus proyectos de construir componentes más grandes o “contenedores” de muchos otros componentes repetitivos y más pequeños. Es importante buscar este desacople entre componentes de la mejor manera posible.


# Ciclo de vida de componentes

**Un componente pasa por varias etapas en su ciclo de vida.** A través de hooks, puedes realizar una determinada acción cuando el componente es inicializado, cuando se dispara un evento, cuando se detecta un cambio, cuando el componente es destruido, etc.


 ## Hooks más utilizados

 ## Constructor

Como en toda clase en la programación orientada a objetos, el `constructor` es quien crea la instancia del objeto y sus dependencias.

- Solo se ejecuta una vez antes del render del componente.
- No tiene que utilizarse para procesos asincrónicos.

## ngOnChanges

El hook `ngOnChanges()` se dispara cada vez que se produce un cambio de estado en el componente. Cuando una variable cambia de valor, por ejemplo o ante el cambio de valor de un Input.

- Se ejecuta N cantidad de veces antes y durante el render del componente.
- Puede emplearse para procesos asincrónicos.


## ngOnInit

Es el hook más usado, `ngOnInit()` es ideal para cualquier solicitud de datos asincrónicos a una API para preparar el componente antes de renderizarlo.

- Únicamente se ejecuta una vez, antes del render del componente.
- Puede usarse para procesos asincrónicos.


## ngAfterViewInit

Este hook únicamente se ejecuta una vez cuando el render del componente haya finalizado. Puede serte útil para realizar acciones programáticas que requieran que todo el HTML del componente ya este preparado.

- Únicamente se ejecuta una vez después del render del componente.

##  ngOnDestroy

Finalmente, `ngOnDestroy()` se ejecutará cuando el componente es destruido, o sea, cuando ya no existe en la interfaz del navegador. Suele utilizarse para liberar espacios de memoria que el componente requiera.

## Usando hook

Los hooks de ciclo de vida de Angular, son interfaces que tienen que importarse desde `@angular/core` para implementarlos en la clase y así detectar los cambios en cada evento.



```js
import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.less']
})
export class TestNameComponent implements OnInit, AfterContentInit, OnDestroy {

  constructor() {
    console.log('1. Primero sucederá esto');
  }

  ngOnInit(): void {
    console.log('2. Luego esto');
  }
  
  ngAfterViewInit(): void {
    console.log('3. Seguido de esto');
  }
  
  ngOnDestroy(): void {
    console.log('4. Finalmente esto (cuando el componente sea destruido)');
  }
  
}
``` 

Cada hook tiene sus características y utilidades recomendadas dependiendo lo que necesitas hacer.
Es importante seguir estas recomendaciones para buscar optimizar el rendimiento de tu aplicación.


# ngDestroy & SetInput

El hook `ngOnDestroy() & SetInput` tiene una importancia clave para el cuidado de nuestra aplicación. **Su funcionalidad más importante es la liberación de espacio** en memoria de variables para que no se acumule. Si esto llegara a suceder en tu aplicación, la misma podría volverse lenta y tosca a medida que toda la memoria del navegador es ocupada.

## Liberando espacio de memoria
Todo el ecosistema Angular está basado en observables para el manejo asincrónico.

Cada vez que utilices un `subscribe()` para escuchar la respuesta de algún evento asincrónico (por ejemplo, el llamado a una API), es relevante realizar el respectivo `unsubscribe()` para liberar ese espacio en memoria.

## RxJS
RxJS (Reactive Extensions Library for JavaScript) es una popular librería de Javascript para el manejo de observables. Si trabajas con Angular esta librería será tu mejor amiga.

Observa el siguiente ejemplo donde primero se importa `Subscription` desde `rxjs` para tipar la variable `suscription`. Guardamos el observable para posteriormente darlo de baja. También importamos `interval` que devuelve el observable y genera un contador que emite una pulsación, en este ejemplo, cada 1000 milisegundos.

```js
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-test-name',
  templateUrl: './test-name.component.html',
  styleUrls: ['./test-name.component.less']
})
export class TestNameComponent implements OnDestroy, OnInit {

    count = interval(1000);
    suscription!: Subscription;

    ngOnInit(): void {
        this.suscription = this.count.subscribe(d => {
          console.log("contando:", d);
        })
    }

    ngOnDestroy(): void {
        this.suscription.unsubscribe();
    }

}
```

En el `ngOnInit()`, se está suscribiendo a la propiedad `this.count` para imprimir por consola, cada 1000 milisegundos, el contador.

Si nuestro código acabara aquí, cuando el componente es destruido, el contador continuaría ocupando memoria que ya no debería ser utilizada.

Para solucionar esto, guardamos en `this.suscription` el observable del contador y en `ngOnDestroy()` y llamamos al método `.unsubscribe()` para detener el contador.


