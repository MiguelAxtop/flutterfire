
const fs = require("fs");
// //Recibo de Remesas
module.exports.getJson = async () => {
    let dataJsonFile = fs.readFileSync('./pruebas/dimentionsPage.json');
    return JSON.parse(dataJsonFile);
}
