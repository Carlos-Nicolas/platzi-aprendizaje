
# Scripts

El **DOM **es la representación que hace el navegador de un documento HTML.

El navegador interpreta el archivo HTML y cuando termina de transformarlo al DOM se dispara el evento DOMContentLoaded lo que significa que todo el documento está disponible para ser manipulado.

Todo script que carguemos en nuestra página tiene un llamado y una ejecución.

Tanto con async como defer podemos hacer llamados asíncronos pero tiene sus diferencias:

- async. Con async podemos hacer la petición de forma asíncrona y no vamos a detener la carga del DOM hasta que se haga la ejecución del código.

- defer. La petición es igual asíncrona como en el async pero va a deferir la ejecución del Javascript hasta el final de que se cargue todo el documento.
```
Nota : Hay que tener en cuenta que cuando carga una página y se encuentra un script a ejecutar toda la carga se detiene. Por eso se recomienda agregar tus scripts justo antes de cerrar el body para que todo el documento esté disponible.
```

# Scope
El Scope o ámbito es lo que define el tiempo de vida de una variable, en que partes de nuestro código pueden ser usadas.

 ## Global Scope
Variables disponibles de forma global se usa la palabra var, son accesibles por todos los scripts que se cargan en la página y se declaran fuera de una función o bloque. Aquí hay mucho riesgo de sobreescritura.

## Function Scope
Variables declaradas dentro de una función utilizando var sólo visibles dentro de ella misma (incluyendo los argumentos que se pasan a la función).

## Block Scope
Variables definidas dentro de un bloque, por ejemplo variables declaradas dentro un loop while o for. Se usa let y const para declarar este tipo de variables.

## Module Scope
Cuando se denota un script de tipo module con el atributo type="module las variables son limitadas al archivo en el que están declaradas.

# closures

Son funciones que regresan una función o un objeto con funciones que mantienen las variables que fueron declaradas fuera de su scope.

Los closures nos sirven para tener algo parecido a variables privadas, característica que no tiene JavaScript por default. Es decir encapsulan variables que no pueden ser modificadas directamente por otros objetos, sólo por funciones pertenecientes al mismo.



```js
function iniciar() {
  var nombre = "Mozilla";  // La variable nombre es una variable local creada por iniciar.
  function mostrarNombre() {  // La función mostrarNombre es una función interna, una clausura.
    alert(nombre);  // Usa una variable declarada en la función externa.
  }
  mostrarNombre();
}
iniciar();  
```
# this

this se refiere a un objeto, ese objeto es el que actualmente está ejecutando un pedazo de código.

No se puede asignar un valor a this directamente y este depende de en que scope nos encontramos:

- Cuando llamamos a this en el Global Scope o Function Scope, se hace referencia al objeto window. A excepción de cuando estamos en strict mode que nos regresará undefined.

- Cuando llamamos a this desde una función que está contenida en un objeto, this se hace referencia a ese objeto.

- Cuando llamamos a this desde una “clase”, se hace referencia a la instancia generada por el constructor.

# Los métodos call, apply y bind

Estas funciones nos sirven para establecer el valor de this, es decir cambiar el contexto que se va usar cuando la función sea llamada.

Las funciones call, apply y bind son parte del prototipo Function. Toda función usa este prototipo y por lo tanto tiene estas tres funciones.

- functionName.call(). Ejecuta la función recibiendo como primer argumento el this y los siguientes son los argumentos que recibe la función que llamó a call.

- functionName.apply(). Ejecuta la función recibiendo como primer argumento el this y como segundo un arreglo con los argumentos que recibe la función que llamó a apply.

- functionName.bind(). Recibe como primer y único argumento el this. No ejecuta la función, sólo regresa otra función con el nuevo this integrado.

# Prototype

En Javascript todo son objetos, no tenemos clases, no tenemos ese plano para crear objetos.

Todos los objetos “heredan” de un prototipo que a su vez hereda de otro prototipo y así sucesivamente creando lo que se llama la prototype chain.

La keyword new crea un nuevo objeto que “hereda” todas las propiedades del prototype de otro objeto. No confundir prototype con proto que es sólo una propiedad en cada instancía que apunta al prototipo del que hereda.

```js
  // Un objeto común y corriente
       const zelda = {
         name: 'Zelda',
       };

       zelda.saludar = function() {
         console.log(`Hola soy ${this.name}`);
       };

       zelda.saludar();

       const link = {
         name: 'Link',
       };

       link.saludar = function() {
         console.log(`Hola soy ${this.name}`);
       };

       link.saludar();
```
### Seamos un poco más eficientes
```js
       
       function Hero(name) {
         const hero = {
           name: name,
         }
         hero.saludar = function() {
           console.log(`Hola soy ${this.name}`);
         }
         return hero;
       }
       const zelda = Hero('Zelda');
       zelda.saludar()
       const link = Hero('Link');
       link.saludar();
```

###  Aun podemos mejorar más y evitar tener que crear la misma función cada vez

```js

      const heroMethods = {
        saludar: function() {
          console.log(`Me llamo ${this.name}`);
        },
      };

      function Hero(name) {
        const hero = {
          name: name,
        };
        hero.saludar = heroMethods.saludar;
        return hero;
      }

      const zelda = Hero('Zelda');
      zelda.saludar();

      const link = Hero('Link');
      link.saludar();
```
## Object.create

```js
El método Object.create() crea un objeto nuevo, utilizando un objeto existente como el prototipo del nuevo objeto creado.

const nuevoObjeto = Object.create(objeto);
```


```js
      const heroMethods = {
        saludar: function() {
          console.log(`Soy superheroe! ${this.name}`);
        },
      };

      function Hero(name) {
        const hero = Object.create(heroMethods);
        //todas las propiedades de heroMethods ahora forman parte de este hero
        hero.name = name;

        return hero;
      }

      const zelda = Hero('Zelda');
      zelda.saludar();

      const link = Hero('Link');
      link.saludar();
```

```js
      // Los métodos de hero dentro de Hero
      const heroMethods = {
        saludar: function() {
          console.log(`Soy superheroe! ${this.name}`);
        },
      };

      function Hero(name) {
        const hero = Object.create(Hero.prototype);
        hero.name = name;

        return hero;
      }
      Hero.prototype.saludar = function() {
        console.log(`Soy superheroina! ${this.name}`);
      };

      const zelda = Hero('Zelda');
      zelda.saludar();

      const link = Hero('Link');
      link.saludar();
```


```js
      // new es un atajo (azucar sintactica) para llevar Hero.prototype al objeto que estamos creando
      function Hero(name) {
        // this = Object.create(Hero.prototype);
        this.name = name;
        // return this esto se da de manera implicita ;
      }

      Hero.prototype.saludar = function() {
        console.log(`New: ${this.name}`);
      };

      const zelda = new Hero('Zelda');
      zelda.saludar();

      const link = new Hero('Link');
      link.saludar();
```


# Herencia Prototipal

Por default los objetos en JavaScript tienen cómo prototipo a Object que es el punto de partida de todos los objetos, es el prototipo padre. Object es la raíz de todo, por lo tanto tiene un prototipo padre undefined.

Cuando se llama a una función o variable que no se encuentra en el mismo objeto que la llamó, se busca en toda la prototype chain hasta encontrarla o regresar undefined.

La función hasOwnProperty sirve para verificar si una propiedad es parte del objeto o si viene heredada desde su prototype chain.

```js
function Hero(name) {
        this.name = name;
      }

      Hero.prototype.saludar = function() {
        console.log(`Hola, soy ${this.name}.`);
      };

      const zelda = new Hero('Zelda');

      // propiedades de la instancia
      console.log('Name:', zelda.name);
      // propiedades de la "clase"
      console.log('Saludar:', zelda.saludar);

      // propiedades heredadas ej: toString
      console.log('toString:', zelda.toString);

      // hasOwnProperty (de dónde sale toString o esto?)
      console.log(
        'zelda.hasOwnProperty("saludar"):',
        zelda.hasOwnProperty('saludar')
      );
```
# Parsers y el Abstract Syntax Tree

El JS Engine recibe el código fuente y lo procesa de la siguiente manera:

- El parser descompone y crea tokens que integran el AST.
- Se compila a bytecode y se ejecuta.
- Lo que se pueda se optimiza a machine code y se reemplaza el código base.

Un SyntaxError es lanzado cuando el motor JavaScript encuentra partes que no forman parte de la sintaxis del lenguaje y esto lo logra gracias a que se tiene un AST generado por el parser.

El parser es del 15% al 20% del proceso de ejecución por lo que hay que usar parser del código justo en el momento que lo necesitamos y no antes de saber si se va a usar o no.

# Event Loop

El Event Loop hace que Javascript parezca ser multihilo a pesar de que corre en un solo proceso.

Javascript se organiza usando las siguientes estructuras de datos:

- **Stack.** Va apilando de forma organizada las diferentes instrucciones que se llaman. Lleva así un rastro de dónde está el programa, en que punto de ejecución nos encontramos.

- **Memory Heap.** De forma desorganizada se guarda información de las variables y del scope.

- **Schedule Tasks.** Aquí se agregan a la cola, las tareas programadas para su ejecución.

- **Task Queue.** Aquí se agregan las tares que ya están listas para pasar al stack y ser ejecutadas. El stack debe estar vacío para que esto suceda.

- **MicroTask Queue.** Aquí se agregan las promesas. Esta Queue es la que tiene mayor prioridad.

El Event Loop es un loop que está ejecutando todo el tiempo y pasa periódicamente revisando las queues y el stack moviendo tareas entre estas dos estructuras.


# Promesas

Para crear las promesas usamos la clase Promise. El constructor de Promise recibe un sólo argumento, un callback con dos parámetros, resolve y reject. resolve es la función a ejecutar cuando se resuelve y reject cuando se rechaza.

El async/await es sólo syntax sugar de una promesa, por debajo es exactamente lo mismo.

La clase Promise tiene algunos métodos estáticos bastante útiles:

```js
Promise.all([p1,p2,p3]). Da error si una de las promesas es rechazada.// array de promesas

Promise.race() Regresa sólo la promesa que se resuelva primero.// debuelve solo la promesa que se resuelva primero
```

# Getters y setters

Los getters y setters son funciones que podemos usar en un objeto para tener propiedades virtuales. Se usan los keywords set y get para crear estas propiedades.

Estas propiedades al ser funciones pueden llevar una validación de por medio y ser usadas con el operador de asignación como si fueran una variable más dentro del objeto.


# Generators

Los generadores son funciones especiales, pueden pausar su ejecución y luego volver al punto donde se quedaron recordando su scope.

Algunas de sus características:

- Los generadores regresan una función.
- Empiezan suspendidos y se tiene que llamar next para que ejecuten.
- Regresan un value y un boolean done que define si ya terminaron.
- yield es la instrucción que regresa un valor cada vez que llamamos a next y detiene la ejecución del generador.

```js
  // Los generadores son funciones de las que se puede salir y volver a entrar.
      // Su contexto (asociación de variables) será conservado entre las reentradas.
      // Cada vez que llamamos next, la ejecución del generador va a continuar hasta el proximo yield
      function* simpleGenerator() {
        console.log('GENERATOR START');
        yield 1;
        yield 2;
        yield 3;
        console.log('GENERATOR END');
      }

      // const gen = simpleGenerator();

      // Podemos hacer generadores infinitos.
      function* idMaker() {
        let id = 1;
        while (true) {
          yield id;
          id = id + 1;
        }
      }

      // Cuando llamamos next también podemos pasar valores que la función recibe.
      function* idMakerWithReset() {
        let id = 1;
        let reset;
        while (true) {
          reset = yield id;
          if (reset) {
            id = 1;
          } else {
            id = id + 1;
          }
        }
      }

      // Ahora hagamos un ejemplo un poco más complejo: la secuencia fibonacci
      function* fibonacci() {
        let a = 1;
        let b = 1;
        while (true) {
          const nextNumber = a + b;
          a = b;
          b = nextNumber;
          yield nextNumber;
        }
      }
```

# Fetch - Cómo cancelar peticiones

La peticiones AJAX permitieron en su tiempo hacer peticiones asíncronas al servidor sin tener que detener la carga de la página. Hoy en día se utiliza la función fetch para esto.

Con fetch tenemos algo llamado AbortController que nos permite enviar una señal a una petición en plena ejecución para detenerla.

```js
const url =
        'https://images.pexels.com/photos/974470/nature-stars-milky-way-galaxy-974470.jpeg?q=100';
      const img = document.getElementById('huge-image');
      const loadButton = document.getElementById('load');
      const stopButton = document.getElementById('stop');
      let controller;

      function startLoading() {
        loadButton.disabled = true;
        loadButton.innerText = 'Loading...';
        stopButton.disabled = false;
      }

      function stopLoading() {
        loadButton.disabled = false;
        loadButton.innerText = 'Load HUGE Image';
        stopButton.disabled = true;
      }

      loadButton.onclick = async function() {
        startLoading();

        controller = new AbortController();

        try {
          const response = await fetch(url, { signal: controller.signal });
          const blob = await response.blob(); // blob es el binario de la peticion 
          const imgUrl = URL.createObjectURL(blob);
          img.src = imgUrl;
        } catch (error) {
          console.log(error.message);
        }

        stopLoading();
      };

      stopButton.onclick = function() {
        controller.abort();
        stopLoading();
      };
```