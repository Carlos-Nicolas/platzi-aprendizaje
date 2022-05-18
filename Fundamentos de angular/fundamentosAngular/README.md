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
