var request = require('request');
var fs = require('fs');

const subirVideos = async (videoName, semanaName, newSemanaName, time) => {
    var options = {
        'method': 'POST',
        'url': 'http://35.184.215.75:80/video',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "videoName": videoName,
            "semanaName": semanaName,
            "newSemanaName": newSemanaName,
            "time": time,
            "widthScreen": 1000,
            "heightScreen": 700,
            "widthHoverButton": 850,
            "heightHoverButton": 182
        })

    };
    request(options, function (error, response) {
        if (error) {
            console.log("error----")
            console.log(`
            ERROR{
                "videoName": ${videoName},
                "semanaName": ${semanaName},
                "newSemanaName": ${newSemanaName},
                "time": ${time}
            }`)
        };
        console.log(response.body);
    });
}
const subirVideosPruebaLocal = async (videoName, semanaName, newSemanaName, time) => {
    console.log("segundos")
    console.log(videoName);
}

const main = () => {
    console.log("entro")
    // let dataJsonFile = fs.readFileSync('./datos.json');
    let dataJsonFileOrdenado = fs.readFileSync('./datosJsonOrdenados.json');
    // let dataJson = JSON.parse(dataJsonFile);
    let dataOrdenada = JSON.parse(dataJsonFileOrdenado);
    // for (let j = dataJson['arraySemana'].length - 1; j >= 0; j--) {
    // const semana = dataJson['arraySemana'][dataJson['arraySemana'].length - 1];
    // const semanaNotSpace = replaceAll(semana, " ", "");
    const semanaNotSpace = "Semana 20 Navmesh SaveData ";
    let sumTimeDate = 0;
    let guardarString = "";
    for (let i = 0; i < dataOrdenada[semanaNotSpace].length; i++) {
        let videoName = dataOrdenada[semanaNotSpace][i]['videoName'];
        let semanaName = dataOrdenada[semanaNotSpace][i]['semanaName'];
        let newSemanaName = dataOrdenada[semanaNotSpace][i]['newSemanaName'];
        let time = dataOrdenada[semanaNotSpace][i]['time'];
        const timeTime = timeConvert(time);
        sumTimeDate = sumTimeDate + timeTime + 300000;
        console.log("-----------------")
        console.log(videoName);
        guardarString = fechaPrint(sumTimeDate, guardarString);
        console.log("----------------")

        // console.log(sumTimeDate);
        // let date = Date.now();
        // let dateString = Date(date);
        // console.log(videoName);
        // console.log("INICIO: " + dateString);
        // Ejecutamos la funcion
        // setTimeout(async () => {
        //     subirVideos(videoName, semanaName, newSemanaName, time)
        // }, sumTimeDate);
    }
}

const timeConvert = (time) => {
    let timeSplit = time.split(':');
    if (timeSplit.length == 3) {
        let hourstoSec = parseInt(timeSplit[0]) * 60 * 60;
        let minstoSec = parseInt(timeSplit[1]) * 60;
        let secs = parseInt(timeSplit[2]);
        return (hourstoSec + minstoSec + secs) * 1000;
    } else if (timeSplit.length == 2) {
        let minstoSec = parseInt(timeSplit[0]) * 60;
        let secs = parseInt(timeSplit[1]);
        return (minstoSec + secs) * 1000;
    } else {
        let secs = parseInt(time);
        return (secs + 20) * 1000;
    }
}
// }
// FUncion para quitar espacios
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function fechaPrint(sumTime, guardarString) {
    // let newDate = Date(sumFecha);
    const nowDateddgdgz = Date(Date.now());
    // get the current date & time (as milliseconds since Epoch)
    const currentTimeAsMs = Date.now();

    // Add 3 days to the current date & time
    //   I'd suggest using the calculated static value instead of doing inline math
    //   I did it this way to simply show where the number came from
    const adjustedTimeAsMs = currentTimeAsMs + sumTime;

    // create a new Date object, using the adjusted time
    const adjustedDateObj = new Date(adjustedTimeAsMs);
    // console.log(`Video Generado entre (${nowDateddgdgz}) - (${newDate})`);

    if (guardarString !== "") {

        console.log(`console.log(Video Generado entre(${guardarString}) - (${adjustedDateObj})`);
    } else {

        console.log(`console.log(Video Generado entre(${nowDateddgdgz}) - (${adjustedDateObj}));`)
    }
    return adjustedDateObj;

}
main();