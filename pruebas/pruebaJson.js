const listaSemana = "Introduccionsdjdn sjd 444";
const semanaNameNotSpace = replaceAll(listaSemana.toString(), " ", "");
const stringDataSemana = `{
            "${semanaNameNotSpace}": []
          }`;
console.log(semanaNameNotSpace);
console.log(stringDataSemana)
const dataJsonParse = JSON.parse(stringDataSemana);
console.log(dataJsonParse)

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}