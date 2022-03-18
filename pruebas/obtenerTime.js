const puppeteer = require("puppeteer");
var jsonNameVideoSemana = [
    {
        "videoName": "01 Animations 3D Spanish 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/01_Animations_3D_Spanish_01.mp4",
        "time": "01:37:11"
    },
    {
        "videoName": "02 Animations 3D English 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/02_Animations_3D_English_01.mp4",
        "time": "14:36"
    },
    {
        "videoName": "03 Creating Animation Blueprint Spanish 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/03_Creating_Animation_Blueprint_Spanish_01.mp4",
        "time": "09:45"
    },
    {
        "videoName": "04 Animation Blueprints Spanish 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/04_Animation_Blueprints_Spanish_01.mp4",
        "time": "08:17"
    },
    {
        "videoName": "05 Animation Blueprints English 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/05_Animation_Blueprints_English_01.mp4",
        "time": "02:50"
    },
    {
        "videoName": "06 Notifys BlendSpace Montages Spanish 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/06_Notifys_BlendSpace_Montages_Spanish_01.mp4",
        "time": "27:42"
    },
    {
        "videoName": "07 AnimationBlueprint Finishing 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/07_AnimationBlueprint_Finishing_01.mp4",
        "time": "23:30"
    },
    {
        "videoName": "08 Animation IK 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/08_Animation_IK_01.mp4",
        "time": "22:45"
    },
    {
        "videoName": "09 Animation StepByStep 01",
        "semanaName": "Semana 18 Animations Notifys IK ",
        "newSemanaName": "18-Semana_18_Animations_Notifys_IK/09_Animation_StepByStep_01.mp4",
        "time": "12:53"
    }
];

const sa = require('../subirArchivo.js');
const { getStream, launch } = require("puppeteer-stream");
const fs = require("fs");
// OBtenemos los datos 
// let dataJsonFile = fs.readFileSync('datosSemana18.json');
// let dataJson = JSON.parse(dataJsonFile);
const runner = async () => {

    /// Paso 1 Abrimos el navegador
    console.log("Abrimos el navegador");
    // Instancia del navegador
    var browser;
    browser = await launch({
        // Ejecutable en linux
        // executablePath: "/usr/bin/microsoft-edge-stable",
        // Ejecutable en Windows
        executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
        headless: false,
        timeout: 0,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        defaultViewport: {
            width: 1220,
            height: 720,
        },
    });
    /// 2 Abrimos una nueva pagina
    console.log("Abrimos la pagina")
    const page = await browser.newPage();
    page.setViewport({ width: 1220, height: 720 });
    // Funcion para terminar todo
    async function cleanup() {
        try {
            // Destruimos el strem del video
            // await stream.destroy();
            // Cerramos la instancia al archivo
            file.close();
            // Cerramos la pagina
            await page.close();
            console.log("Subir Archivo");
            // Cerramos el navegador
            await browser.close();
            // Subimos el archivo
            // sa.subirVideo();
            console.log("finished");
        } catch (e) {
            console.log("Cannot cleanup istances");
        }
    }
    // Configurar el tiempo de espera de la navegación
    await page.setDefaultNavigationTimeout(100000);
    console.log("1.1 Iniciando Navegador");
    await page.goto("https://campus.ua.school/campus/", {
        waitUntil: "load", timeout: 0
    });
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
            // BORRAR
            //// Obtenemos los datos donde estan los archivos
            /* desborrar
            const semanaNameNotSpace = replaceAll(semanaName, " ", "");
            if (dataJson[semanaNameNotSpace] === undefined) {
                const listaSemana = await page.evaluate(() => Array.from(document.querySelectorAll('div#videolist.boxcontent.pad1h.folders > div'), element => element.getAttribute("name")));
                let arrayListaSemana = [];
                for (let i = 0; i < listaSemana.length; i++) {
                    if (listaSemana[i] !== null) {
                        arrayListaSemana.push(listaSemana[i]);
                        console.log(listaSemana[i])
                        dataJson[semanaNameNotSpace] = [];
                    }
                }
                dataJson['arraySemana'] = arrayListaSemana;
                fs.writeFileSync('datos.json', JSON.stringify(dataJson));
                console.log("Lista de Semanas")
                console.log(listaSemana.toString());
                console.log(true);
            }
            */
            // /BORRAR
            // stream = await getStream(page, { audio: true, video: true });
            // console.log("3.3 Entrando a la Semana");
            // await page.waitForSelector(`div[name='${semanaName}']`)
            // await page.click(`div[name='${semanaName}']`);

            ///BORRARF
            // await page.waitForSelector(`div[name='${videoName}']`)
            // const listaVideos = await page.evaluate(() => Array.from(document.querySelectorAll('div#videolist.boxcontent.pad1h.folders > div'), element => element.getAttribute("name")));
            // console.log("Lista de Videos")
            // console.log(listaVideos.toString());
            // if (dataJson[semanaNameNotSpace].length === 0) {
            //     let arrayListaVideos = [];
            //     for (let i = 0; i < listaVideos.length; i++) {
            //         if (listaVideos[i] !== null) {
            //             arrayListaVideos.push(listaVideos[i]);
            //         }
            //     }
            //     dataJson[semanaNameNotSpace] = arrayListaVideos;
            //     fs.writeFileSync('datos.json', JSON.stringify(dataJson));
            // }
            // await page.click(`div[name='${videoName}']`);
            // console.log("3.3 Click play video");
            // console.log('before waiting');
            // await delay(6000);
            // console.log('after waiting');
            // const liButton = await page.evaluate(() => Array.from(document.querySelectorAll('div#videocontent > iframe'), element => element.innerHTML));
            // for (let i = 0; i < liButton.length; i++) {
            //     const element = liButton[i];
            //     console.log(element);
            // }
            // for (let j = 9; j < dataJson['arraySemana'].length; j++) {
            // console.log("----------SEMANA " + j + "------------------------")
            // for (let j = 0; j < dataJson['arraySemana'].length; j++) {
            // const semana = dataJson['arraySemana'][j];
            const semana = "Semana 18 Animations Notifys IK ";

            console.log("3.3 Entrando a la Semana");
            await page.waitForSelector(`div[name='${semana}']`)
            await page.click(`div[name='${semana}']`);

            console.log("3.3 Click al video");
            //BORRAR
            await delay(2000)
            // const semanaNotSpace = replaceAll(semana, " ", "");
            await delay(2000)
            let arrayTime = [];
            for (let i = 0; i < jsonNameVideoSemana.length; i++) {
                const newSemanaName = jsonNameVideoSemana[i]['newSemanaName'];

                await page.waitForSelector(`div.folderitem.videoitem[file="${newSemanaName}"]`);
                await page.click(`div.folderitem.videoitem[file="${newSemanaName}"]`);

                console.log("3.3 Click play video");
                console.log('before waiting');
                await delay(10000);
                console.log('after waiting');
                const elementHandle = await page.waitForSelector('div#videocontent > iframe');
                const frame = await elementHandle.contentFrame();
                // Hacer grande la pantala video
                // await Promise.all([
                //     frame.waitForSelector('div.fwdevp:last-child > div:nth-child(10) > div:first-child > div:last-child > div:last-child > img:last-child'),
                //     frame.click('div.fwdevp:last-child > div:nth-child(10) > div:first-child > div:last-child > div:last-child > img:last-child')
                // ]);
                /// Poner play al video
                if (await playVideo(frame)) {
                    await Promise.all([
                        frame.waitForSelector('div.fwdevp:last-child > div:nth-child(13)'),
                        frame.click('div.fwdevp:last-child > div:nth-child(13)'),
                    ]);
                }
                await delay(30000)
                const nameVideoEvaluate = await frame.$eval('div.fwdevp-time', element => element.innerHTML);
                console.log("nameVideoEvaluate");
                console.log(nameVideoEvaluate);
                const splitnameVideoEvaluate = nameVideoEvaluate.split("/");
                let timeJson = jsonNameVideoSemana[i];
                timeJson['time'] = splitnameVideoEvaluate[1];
                await Promise.all([
                    page.waitForSelector('div.closebot'),
                    page.click('div.closebot'),
                ]);
                console.log(timeJson);
                await delay(3000);
                jsonNameVideoSemana[i] = timeJson;

            }

            fs.writeFileSync('datosSemana18.json', JSON.stringify(jsonNameVideoSemana));
            // await delay(30000);
            // await Promise.all([
            //     page.waitForSelector('div#videobox.box.bblack.shadow.relative > div.boxtitbar.dragable > div.triback'),
            //     page.click('div#videobox.box.bblack.shadow.relative > div.boxtitbar.dragable > div.triback'),
            // ]);
            // }
        } catch (error) {
            console.log(error)
        }
    } catch (err) {
        console.log(err)
    }
    cleanup()
    return { "termino": "YES" }
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
runner();
