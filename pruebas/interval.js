
var contsecond = 0;
var intervalTime;
var valuateInterval = [];
var valuateclickVideo = [];
var valuateclickClose = [];
var contadorVideos = 0;
var simulationnumber = 1000;
var arraySemana = [{
    "videoName": "08 CorrectingExercise 02",
    "semanaName": "Semana 02 Functions Inheritance ",
    "newSemanaName": "02-Semana_02_Functions_Inheritance/08_CorrectingExercise_02.mp4",
    "time": "00:25"
},
{
    "videoName": "09 CorrectingExercise 03",
    "semanaName": "Semana 02 Functions Inheritance ",
    "newSemanaName": "02-Semana_02_Functions_Inheritance/09_CorrectingExercise_03.mp4",
    "time": "00:22"
},
{
    "videoName": "10 CorrectingExercise 04",
    "semanaName": "Semana 02 Functions Inheritance ",
    "newSemanaName": "02-Semana_02_Functions_Inheritance/10_CorrectingExercise_04.mp4",
    "time": "00:37"
}];
for (let j = 0; j < arraySemana.length; j++) {
    if (j === 0) {
        valuateInterval.push(true);
        valuateclickVideo.push(true);
        valuateclickClose.push(true);
    } else {
        valuateInterval.push(false);
        valuateclickVideo.push(false);
        valuateclickClose.push(false);
    }
}
intervalTime = setInterval(async function () {

    try {

        if (contadorVideos === arraySemana.length) {
            console.log("termino todo")

            clearInterval(intervalTime);
            // setTimeout(async () => {
            //     console.log("Close Video ::: " + i)
            //     // Cerramos la pagina
            //     // await page.close();
            //     console.log("Subir Archivo");
            //     // Cerramos el navegador
            //     // await browser.close();
            //     notification(videoName);

            // }, arraytimeTime[i] + 2000);
        } else {


            if (contadorVideos < arraySemana.length) {
                let i = contadorVideos;
                const element = arraySemana[i];
                let videoName = element['videoName'];
                // Creamos la instancia para escribir en el arhivo
                // let videoNameNotSpace = replaceAll(videoName, " ", "");
                if (valuateclickVideo[i]) {
                    console.log("Click Video ::: " + i)
                    if (i < arraySemana.length) {
                        valuateclickVideo[i] = false;
                        valuateclickVideo[i + 1] = true;
                    }

                    // await clickVideoF(i);
                    // // console.log("Click Expanded ::: " + i)
                    // if (await clickPlayVideoF()) {
                    //     await clickExpandedF();
                    // }
                    await delay(1000)
                }
                // const nameVideoEvaluate = await frame.$eval('div.fwdevp-time', element => element.innerHTML);
                // const splitnameVideoEvaluate = nameVideoEvaluate.split("/");
                let timeOriginal = element['time']
                // let timeVideo = splitnameVideoEvaluate[0];
                // const numtimeTime = timeConvert(t);
                console.log(simulationnumber)
                console.log(timeConvert(timeOriginal))
                if (simulationnumber >= (timeConvert(timeOriginal) + 3000)) {
                    if (valuateInterval[i]) {
                        if (i < arraySemana.length) {
                            valuateInterval[i] = false;
                            valuateInterval[i + 1] = true;
                        }
                        contadorVideos++;
                        simulationnumber = 1000;
                        // await limpiar(false, videoNameNotSpace, videoName, element['semanaName']);
                        await delay(3000);
                    }
                    console.log("Siiiiiiii----------------------------------------------------------------------231-2");
                }
                simulationnumber = simulationnumber + 1000;
                if (valuateclickVideo[i]) {
                    console.log("Click Close Strram ::: " + i)
                    if (i < arraySemana.length) {
                        valuateclickClose[i] = false;
                        valuateclickClose[i + 1] = true;
                    }
                    // await clickStreamAndRecordingF();
                    // valuateclickVideo[i] = false;
                    // valuateclickVideo[i + 1] = true;
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}, 1000);

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
        return (secs) * 1000;
    }
}

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
