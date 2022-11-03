# template

**Basicamente la API Template nos permite conectar un web component de forma más profesional y organizada.** También nos ayuda a clonar los elementos facilmente (Ya que como lo hicimos en la clase anterior el elemento no se clonaba, sino que se pasaba de etiqueta en etiqueta hasta la ultima en ser renderizada)

**La etiqueta `<template>`**

Es una etiqueta que nos sirve como contenedor de código. Todo lo que escribamos adentro de esta etiqueta **no se va a renderizar , sino que hay que activarlo mediante Javascript**. El profesor sin embargo no muestra cual es dicho proceso y procede a utilizar una forma distinta. En el siguiente enlace vas a ver cómo se activa desde JS:

# **Escribir y activar el código dentro de la clase**

De esta forma estamos armando toda la estructura HTML dentro de Javascript, pero insertandola en la clase y fraccionando el HTML y CSS para más placer.

En este caso, creamos la clase, con su extension y constructor, luego creamos un método que contendrá la estructura HTML **(getElement)** . Adentro insertamos la variable template que contiene la estructura.

```js
getTemplate() {
        const template = document.createElement('template');
       	template.innerHTML = `
		...(codigo HTML)
	`
}
```
En otro metodo **(getStyles)** todo lo que hacemos es retornar un literal string que contiene el código CSS (si queremos podemos contenerla en una variable, eso es a comodidad del programador)

```js
getStyles() {
        return `...(código CSS)`
}
```
y luego al final del código de getElement la llamamos de esta forma

`${this.getStyles()}`

# **Clonar Elementos**

Para clonar el código debemos indicar mediante el método cloneNode que se puede clonar. Para eso invocamos el contenido de getTemplate, y lo anidamos a la clase (que luego al ser invocada en el HTML se convierte en la etiqueta misma)

render() { this.appendChild(this.getTemplate().content.cloneNode(true)) }

 # **Y FINALMENTE…**

Invocamos el render

`connectedCallback() { this.render(); }`