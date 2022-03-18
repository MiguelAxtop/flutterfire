var request = require('request');
var fs = require('fs');

console.log("entro")
let dataJsonFile = fs.readFileSync('./datos.json');
let dataJsonFileOrdenado = fs.readFileSync('./datosJsonOrdenados.json');
let dataJson = JSON.parse(dataJsonFile);
let dataOrdenada = JSON.parse(dataJsonFileOrdenado);
let sum = 0;
for (let j = dataJson['arraySemana'].length - 1; j >= 0; j--) {
    const semana = dataJson['arraySemana'][j];
    const semanaNotSpace = replaceAll(semana, " ", "");
    const len = dataOrdenada[semanaNotSpace].length;
    sum = sum + len;
    console.log(len);

}
console.log(sum);
// }
// FUncion para quitar espacios
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}