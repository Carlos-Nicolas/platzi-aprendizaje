//codigo cuadrado

console.group("Cuadrados");
const ladoCuadrado = 5;
console.log("los lados del cuadrado miden: " + ladoCuadrado + "cm");

const perimetroCuadrado = ladoCuadrado * 4;
console.log("el perimetro del cuadrado es: " + perimetroCuadrado + "cm");

const areaCuadrado = ladoCuadrado * ladoCuadrado;
console.log("el area del cuadrado es: " + areaCuadrado + "cm^2");

console.groupEnd("Cuadrados")

//fin codigo cuadrado


// codigo triangulo
console.group("Triangulos")
const ladoTriangulo1 = 6;
const ladoTriangulo2 = 6;
const baseTriangulo = 4;
const alturaTriangulo = 5.5;

console.log("la altura del triangulo es: " + alturaTriangulo + "cm");
console.log("los lados del Triangulo miden: \n" + ladoTriangulo1 + "cm\n" + ladoTriangulo2 + "cm\n" + baseTriangulo + "cm\n");

const perimetroTriangulo = ladoTriangulo1 + ladoTriangulo2 + baseTriangulo;
console.log("El perimetro del Triangulo es: " + perimetroTriangulo + "cm");

const areaTriangulo = (baseTriangulo * alturaTriangulo) / 2;
console.log("el area del Triangulo es: " + areaTriangulo + "cm^2");


console.groupEnd("Triangulos")


// codigo Circulo
console.group("Circulo")
const radioCirculo = 4;
console.log("El Radio del circulo es: " + radioCirculo + "cm");
const DiametroCirculo = radioCirculo * 2;
console.log("El diametro del Circulo es: " + DiametroCirculo + "cm");
// const PI =3.14;
const PI = Math.PI;
console.log("El valor de PI es: " + PI);

const perimetroCirculo = DiametroCirculo * PI;
console.log("el Preimtro del circulo es: " + perimetroCirculo + "cm");
const areaCirculo = (radioCirculo ^ 2) * PI;
console.log("el area del circulo es: " + areaCirculo + "cm^2");



console.groupEnd("Circulo")