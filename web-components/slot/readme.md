# slot 
al usar la etiqueta slot dentro de nuestro web componen  se le indica que el texto que tengamos entre de nuestras
etiquetas creadas `<my-element>texto</my-element>` en el index.html  se integrara el texto  en nuestro web component.

nota : el texto tomara los estilos del web-component

# multi-slot

para poder tener diferentes varios slots desde el componente y poderlos usar se le agrega la propiedad de  **name** al slot para poder identificar y poder matchear desde fuera del componente  y para poder hacer el match desde el index.htm 
segenera dentro dela etiqueta creada un `span`con la propiedad slot="name" y asi de matchean el web component internamente y el index.html para poder pintar correctamente  el texto donde va.

```js
//web componen
 getTemplate() {
    const template = document.createElement(`template`);
    template.innerHTML = ` 
      <section>
      <h2>
      <slot name="title"></slot>
      </h2>
      <div>
      <p>
      <slot name="parrafo"></slot>
      </p>
      </div>
      </section>
      ${this.getStyles()}
      `;
    return template;
  }
  
  ```

  ```html
  <!-- htlm -->

<my-element>
        <span slot="title">soy el titulo</span>
        <span slot="parrafo">soy el texto del parrafo </span>
    </my-element>
```
