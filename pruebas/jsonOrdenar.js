
const fs = require("fs");
let dataJsonFile = fs.readFileSync('./datos.json');
let dataJsonFileOrdenado = fs.readFileSync('./datosJsonOrdenados.json');
let dataJson = JSON.parse(dataJsonFile);
let newDataJson = {};
for (let j = 0; j < dataJson['arraySemana'].length; j++) {
    console.log("----------SEMANA " + j + "------------------------")
    const semana = dataJson['arraySemana'][j];
    const semanaNotSpace = replaceAll(semana, " ", "");
    let arrayData = [];
    for (let i = 0; i < dataJson[semanaNotSpace].length; i++) {
        arrayData.push({
            "videoName": dataJson[semanaNotSpace][i],
            "semanaName": semana,
            "time": dataJson[`${semanaNotSpace}Time`][i]
        })
    }
    newDataJson[semanaNotSpace] = arrayData;
}
fs.writeFileSync('./datosJsonOrdenados.json', JSON.stringify(newDataJson));
console.log(newDataJson);


// FUncion para quitar espacios
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}