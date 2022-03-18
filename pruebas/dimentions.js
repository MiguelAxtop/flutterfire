const puppeteer = require("puppeteer");

const sa = require('./subirArchivo.js');
// const { getStream, launch } = require("puppeteer-stream");
// const fs = require("fs");
const dimentions = async (videoName, semanaName, time, page, getStream, file) => {
    const timeTime = timeConvert(time);
    var stream;
    console.log("1.2. Rellenando name user");
    await page.waitForSelector('input[name=user]');
    await page.$eval('input[name=user]', el => el.value = 'xhpedro@hotmail.com');

    console.log("1.3. Rellenando Password user");
    await page.waitForSelector('input[name=pass]');
    await page.$eval('input[name=pass]', el => el.value = 'r3l86lf1CZQK');
    try {
        console.log("2.1 Iniciando Nueva Pagina");
        await Promise.all([
            page.click('div.boton.pad1.bblack.animate1s'),
            page.waitForNavigation()
        ]);
        console.log("Esperando 3 segundos")
        await delay(3000);
        await Promise.all([
            console.log("2.2. Cerrar pantalla de mensaje"),
            page.waitForSelector('div.welcomewin div.novermas2'),
            page.click('div.welcomewin div.novermas2')
        ])
        console.log("Esperando 3 segundos")
        await delay(3000);
        await Promise.all([
            console.log("2.3. Entrando a unreal engine"),
            page.waitForSelector('li.menuop1.menutri.animate1s a'),
            page.hover('li.menuop1.menutri.animate1s a')
        ])
        console.log("Esperando 3 segundos")
        await delay(3000);
        console.log("Terminaron los 3 segundos")
        try {
            console.log("3.1 Entrado a los videos");
            await Promise.all([
                page.mouse.click(844, 182),
                page.waitForNavigation()
            ]);
            console.log("3.3 Entrando a la Semana");
            await page.waitForSelector(`div[name='${semanaName}']`)
            await page.click(`div[name='${semanaName}']`);

            console.log("3.3 Click al video");
            //BORRAR
            await delay(2000)
            ///BORRARF
            await page.waitForSelector(`div[name='${videoName}']`)
            await page.click(`div[name='${videoName}']`);
            stream = await getStream(page, { audio: true, video: true });
            console.log("3.3 Click play video");
            console.log('before waiting');
            await delay(10000);
            console.log('after waiting');
            const elementHandle = await page.waitForSelector('div#videocontent > iframe');
            const frame = await elementHandle.contentFrame();
            let validar = true;
            let position = ["9", "9", "10", "10"];
            let position2 = ["last", "first", "last", "first"];
            let contPosition = 0;
            while (validar) {
                if (contPosition === 4) {
                    break;
                } else {
                    validar = await expandVideo(frame, position[contPosition], position2[contPosition]);
                }
                contPosition++;
            }
            /// Poner play al video
            let playNum = ["12", "13", "14", "15"];
            for (let k = 0; k < playNum.length; k++) {
                const element = playNum[k];
                if (await playVideo(frame, element)) {
                    break;
                }
            }
            // if (await playVideo(frame)) {
            //     await Promise.all([
            //         frame.waitForSelector('div.fwdevp:last-child > div:nth-child(13)'),
            //         frame.click('div.fwdevp:last-child > div:nth-child(13)'),
            //     ]);
            // }
        } catch (error) {
            console.log(error)
        }
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
            console.log("finished Stream");
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

const playVideo = async (frame, playNum) => {
    try {
        await Promise.all([
            frame.waitForSelector(`div.fwdevp:last-child > div:nth-child(${playNum})`),
            frame.click(`div.fwdevp:last-child > div:nth-child(${playNum})`),
        ]);
        return true;
    } catch (error) {
        return false;
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

module.exports = dimentions;
