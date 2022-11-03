const template = document.createElement(`div`);
template.innerHTML = ` 
<style>
p{color:blue;}
    </style>
<p>Hola mundo 2</p>
<p>texto ejemplo para la clase</p>`;

class myElement extends HTMLElement {
  // inicializamos todo en memoria  para despues agregarlos como nodos al DOM
  constructor() {
    super();
    this.p = document.createElement("p");
  }

//   pintamos lo que se tenia preparado en el constructor en el DOM
  connectedCallback() {
    this.p.textContent(`Hola mundo`);
    this.appendChild(this.p);
    this.appendChild(template);
  }
}
// definimos como se tendra que poner la etiqueta como primer parametro y el segundo indicamos que
// la class myElemet es lo que contendra la etiqueta my-element
customElements.define("my-element", myElement);
