//codigo cuadrado

console.group("Cuadrados");
let ladoCuadrado;
console.log("los lados del cuadrado miden: " + ladoCuadrado + "cm");

const perimetroCuadrado = (ladoCuadrado) => {
    return ladoCuadrado * 4
};

const areaCuadrado = (ladoCuadrado) => {
    return ladoCuadrado * ladoCuadrado;
}

console.groupEnd("Cuadrados")

//fin codigo cuadrado


// codigo triangulo
console.group("Triangulos")
let ladoTriangulo1;
let ladoTriangulo2;
let baseTriangulo;
let alturaTriangulo;

const perimetroTriangulo = (ladoTriangulo1, ladoTriangulo2, baseTriangulo) => {
    return ladoTriangulo1 + ladoTriangulo2 + baseTriangulo
};

const areaTriangulo = (baseTriangulo, alturaTriangulo) => {
    return (baseTriangulo * alturaTriangulo) / 2
};


console.groupEnd("Triangulos")


// codigo Circulo
console.group("Circulo")

let radioCirculo;

const DiametroCirculo = (radioCirculo) => {
    return radioCirculo * 2
};
// const PI =3.14;
const PI = Math.PI;

const perimetroCirculo = (radioCirculo, PI) => {
    const diametro = DiametroCirculo(radioCirculo);
    return diametro * PI
};
const areaCirculo = (radioCirculo) => {
    return (radioCirculo ^ 2) * PI
};



console.groupEnd("Circulo")


let calcularPerimetroCuadrado = () => {
    const input = document.getElementById("InputCuadrado");
    const value = input.value;
    const permetro = perimetroCuadrado(value);
    alert(permetro);
}

let calcularAreaCuadrado = () => {
    const input = document.getElementById("InputCuadrado");
    const value = input.value;
    const area = areaCuadrado(value);
    alert(area);
}