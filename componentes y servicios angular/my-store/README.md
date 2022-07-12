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

## Comunicando componentes

Para enviar información de padre a hijo, puedes utilizar el decorador `@Input()` para marcar una propiedad de una clase como punto de entrada de un dato.

```html
<p style="‘text-align:center;’">
  <img
  src=“https://cdn.document360.io/da52b302-22aa-4a71-9908-ba18e68ffee7/Images/Documentation/Screenshot
  from 2022-04-05 22-42-58.png” alt=“Envio de datos componente padre a hijo”>
</p>
```

```js
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-test-name",
  templateUrl: "./test-name.component.html",
  styleUrls: ["./test-name.component.less"],
})
export class TestNameComponent {
  @Input() firstname: string;

  constructor() {}
}
```

Debes importar `Input` desde `@angular/core` para poder utilizar esta directiva e indicar que la propiedad `firstname` es un dato que el componente padre enviará.

Podrás inicializar el componente desde su padre y pasarle los inputs que este necesite de la siguiente manera:

```html
<app-test-name> firstname="Platzi" </app-test-name>
```

También puedes cambiar el nombre el Input especificando el nombre de la propiedad que quieras que este utilice al inicializar el componente.

```sh
...
    @Input('my-name') firstname: string;
...
```

```html
<app-test-name> my-name="Platzi" </app-test-name>
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
<app-test-name> (message)="recibirMensaje($event)" </app-test-name>
```

Se “bindea” la propiedad emisora de eventos con '()' y se le pasa una función que se ejecutará cada vez que emita un evento.
Y en el componente padre:

```js
import { Component } from "@angular/core";

@Component({
  selector: "app-father",
  templateUrl: "./father.component.html",
  styleUrls: ["./father.component.less"],
})
export class FatherComponent {
  constructor() {}

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
import { Component, Input } from "@angular/core";
import { Producto } from "./producto.interface.ts";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.scss"],
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
  <img [src]="producto.image" />
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

## ngOnDestroy

Finalmente, `ngOnDestroy()` se ejecutará cuando el componente es destruido, o sea, cuando ya no existe en la interfaz del navegador. Suele utilizarse para liberar espacios de memoria que el componente requiera.

## Usando hook

Los hooks de ciclo de vida de Angular, son interfaces que tienen que importarse desde `@angular/core` para implementarlos en la clase y así detectar los cambios en cada evento.

```js
import { Component, OnInit, AfterContentInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-test-name",
  templateUrl: "./test-name.component.html",
  styleUrls: ["./test-name.component.less"],
})
export class TestNameComponent implements OnInit, AfterContentInit, OnDestroy {
  constructor() {
    console.log("1. Primero sucederá esto");
  }

  ngOnInit(): void {
    console.log("2. Luego esto");
  }

  ngAfterViewInit(): void {
    console.log("3. Seguido de esto");
  }

  ngOnDestroy(): void {
    console.log("4. Finalmente esto (cuando el componente sea destruido)");
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

# Conociendo los servicios

**Un servicio es la forma que utiliza Angular para modular una aplicación y crear código reutilizable**, este tendrá una determinada lógica de negocio que puede ser usada por varios componentes u otros servicios.

## Tu primer servicio

Con el CLI de Angular, crea un servicio fácilmente con el comando `ng generate service test-name` o en su manera corta `ng g s test-name`. Dicho comando creará dos archivos:

- test-name.service.ts
- test-name.service.spec.ts

Siendo el archivo `.ts` el servicio en sí y el archivo `.spec.ts` el que podrás usar para escribir pruebas unitarias para testear el servicio.

El servicio tendrá por defecto el siguiente código:

```js
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class TestNameService {
  constructor() {}
}
```

Haz visto anteriormente los decoradores en Angular. Así como los componentes usan el decorador `@Component()`, los servicios utilizan `@Injectable()`.

## Utilizando un servicio

**Paso 1:** Agrégale al servicio algo de lógica, por ejemplo, una variable con un determinado valor para ser leído a través de un método:

```js
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TestNameService {
  private testName = 'Hola Platzi';

  constructor() { }

  getTestName(): string {
    return this.testName;
  }
}
```

**Paso 2:** Luego, importa en un componente el servicio de la siguiente manera:

```js
// components/catalogo/catalogo.component.ts
import { TestNameService } from 'src/app/services/test-name.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  // ...

  constructor(
    private testNameService: TestNameService,
  ) { }

  ngOnInit(): void {
    const name = this.testNameService.getTestName();
    console.log(name);
  }
}
```

En el constructor del componente, se inyecta el servicio para poder ser utilizado posteriormente.

En este ejemplo, estamos llamando en el `ngOnInit()` el método `getTestName()` del servicio para obtener el valor de una variable e imprimirla por consola.

De esta manera, puedes tener tu lógica de negocio en un servicio e importar este en N componentes, o incluso en otros servicios y acceder a sus métodos y propiedades.


# ¿Qué es la inyección de dependencias?

Es muy sencillo crear un servicio en Angular, inyectarlo en un componente y utilizar su lógica. Pero siempre es recomendable entender **¿qué es la inyección de dependencias?**, cómo se está haciendo y qué sucede detrás en tu aplicación.

## Patrones de diseño

Angular usa varios patrones de diseño para permitir que esto funcione.

## Inyección de dependencias
Imagínate que tienes el siguiente panorama:
Un **Servicio A** que emplea el **Servicio B** y este a su vez utiliza el **Servicio C.**


Si tuvieses que instanciar el Servicio A, primero deberías:
instanciar el C para poder continuar con el B y luego sí hacerlo con el A. Se vuelve confuso y poco escalable si en algún momento también tienes que instanciar el Servicio D o E.

**La inyección de dependencias** soluciona las dependencias de una clase por nosotros.

Cuando instanciamos en el constructor el servicio A, Angular por detrás genera automáticamente la instancia del servicio B y C sin que nosotros nos tengamos que preocupar por estos.

Cuando creaste tu primer servicio con el CLI de Angular:


```js
// services/test-name.service.ts
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TestNameService {
  constructor() { }
}
```

Este le proporcionó a la clase el decorador `@Injectable({ ... })` con el valor `providedIn: 'root'` que determina el scope del servicio, o sea, determina que el mismo estará disponible en toda el módulo de tu aplicación por default.


## Singleton

La inyección de dependencias no es el único patrón de diseño que Angular usa con sus servicios. También hace uso del **patrón Singleton** para crear una instancia única de cada servicio.

Si tienes un servicio que se utiliza en N cantidad de componentes (u otros servicios), todos estarán utilizando la misma instancia del servicio y compartiendo el valor de sus variables y todo su estado.

## Precauciones utilizando servicios

Ya has visto hasta aquí que un servicio puede ser importado en muchos componentes u otros servicios a la vez. Puedes inyectar la cantidad de servicio que quieras en un componente, siempre de una forma controlada y coherente.


Solo debes tener cuidado con las dependencias circulares. Cuando un servicio importa a otro y este al anterior. Angular no sabrá si vino primero el huevo o la gallina y tendrás un error al momento de compilar tu aplicación.

# Obteniendo datos de una API

Uno de los procesos asíncronos más comunes son las peticiones de datos desde una API. Para esto, Angular posee su propio cliente HTTP destinado a cumplir con el propósito llamado `HttpClientModule`.

## Consumo de API con Angular

**Paso 1:** Comienza importando el módulo `HttpClientModule`, en el módulo principal de tu aplicación desde `@angular/common/http`.


```js
// app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // ..
  ],
  imports: [
    // ...
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ /* .. */ ]
})
export class AppModule { }
```

**Paso 2:** Crea un servicio para realizar todos los **llamados a una API** que necesites. En este servicio tienes que importar el cliente HTTP de Angular y crear un método por cada endpoint para el que necesites efectuar una petición.

```js
// services/api.service.ts
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getProducts() {
    return this.http.get(`https://example.com/api/productos`);
  }
}
```

**Paso 3:** Importa este nuevo servicio en tus componentes para efectuar los llamados a la API.

```js
// components/catalogo/catalogo.component.ts
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  public productos: Producto[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
      this.apiService.getProducts()
        .subscribe(res => {
          this.productos = res;
        });
  }

  // ...
}
```

El método `ngOnInit()` es el lugar apropiado para los llamados asincrónicos, recuerda que no es buena práctica hacerlo en el constructor.

Todo el cliente HTTP de Angular está basado en **Observables**, por lo tanto, es recomendable suscribirse al método del servicio para obtener los datos cuando la API responda.


```sh
TIP: No es necesario que hagas un .unsubscribe() luego del llamado a la API. Angular ya lo hace por ti, cuando usas su cliente HTTP.
```

## Jugando con observables

Si no tienes a tu disposición una API Rest que devuelva datos para tu aplicación, voy a enseñarte un pequeño truco para que aun así puedas continuar con tu desarrollo con un mock de datos.

Un Mock es una simulación de los datos reales que devolverá la API, salvo que esta vez obtendrás dichos datos desde el servicio a través de un Observable.

```js
// services/api.service.ts
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getProducts(): Observable<Producto[]> {
    return of([
      {
        id: 1,
        name: 'Automobil de juguete',
        precio: 100,
        image: 'https://static3.depositphotos.com/1000865/118/i/600/depositphotos_1183767-stock-photo-toy-car.jpg'
      },
      {
        id: 2,
        name: 'Muñeca de trapo',
        precio: 180,
        image: 'https://kinuma.com/8869-home_default/muneca-de-trapo-mali.jpg'
      },
      {
        id: 3,
        name: 'Pelota de futbol',
        precio: 120,
        image: 'https://media.istockphoto.com/photos/soccer-ball-isolated-3d-rendering-picture-id1257575611?k=20&m=1257575611&s=612x612&w=0&h=g530fFJspT42xFGY7HycLvpBKLXpJ2XAkKCRyY-SK80='
      },
      {
        id: 4,
        name: 'Castillo',
        precio: 220,
        image: 'https://i.imgur.com/44nzvkQ.jpg'
      }
    ])
  }

}
```

En el ejemplo anterior, desde **RxJS** se está importando **“Observable” y “of”** que te ayudarán a preparar tus datos.


Con **Observable** puedes tipear la respuesta de tus métodos de la siguiente manera `Observable<Producto[]> `para indicar que este devolverá un observable con un array de productos. La función `of` convierte lo que sea que le pongas dentro (un objeto, un array, un número, etc), en un observable.

De esta forma, sin tener una API real, puedes simular la interacción de tu componente con datos provenientes de una proceso asincrónico.
