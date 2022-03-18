const puppeteer = require("puppeteer");

const sa = require('./subirArchivo.js');
// const { getStream, launch } = require("puppeteer-stream");
// const fs = require("fs");
const dimentionsSize = async (page, width, height, getStream, file) => {
    var stream;
    try {
        console.log("3.3 Cerrar Spanded");
        console.log('before waiting');
        page.setViewport({ width: width, height: height });
        await delay(3000)
        ///BORRARF
        stream = await getStream(page, { audio: true, video: true });
        console.log("3.3 Click play video");
        console.log('before waiting');
    } catch (err) {
        console.log(err)
    }
    // Empezamos a grabar la pantalla
    console.log("recording");
    stream.pipe(file);
    // Limpiamos despues de grabar todo
    setTimeout(async () => {
        try {
            // Destruimos el strem del video
            await stream.destroy();
            // Cerramos la instancia al archivo
            file.close();
            console.log("finished Stream DimentionSize");
        } catch (e) {
            console.log("Cannot cleanup istances");
        }
    }, 15000);
    // }, timeTime);
    return page;
};
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
// FUncion para quitar espacios
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const playVideo = async (frame) => {
    try {
        await Promise.all([
            frame.waitForSelector('div.fwdevp:last-child > div:nth-child(14)'),
            frame.click('div.fwdevp:last-child > div:nth-child(14)'),
        ]);
        return false;
    } catch (error) {
        return true;
    }
}

const expandVideo = async (frame, divNthChild, img) => {
    try {
        await Promise.all([
            frame.waitForSelector(`div.fwdevp:last-child > div:nth-child(${divNthChild}) > div:first-child > div:last-child > div:last-child > img:${img}-child`),
            frame.click(`div.fwdevp:last-child > div:nth-child(${divNthChild}) > div:first-child > div:last-child > div:last-child > img:${img}-child`)
        ]);
        return false;
    } catch (error) {
        return true;
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

module.exports = dimentionsSize;
