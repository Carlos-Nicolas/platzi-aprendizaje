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

