const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const alternativapuppeter = require("./alternativapuppeter");
const runner = require("./puppeteer");

// // const runner = require("./puppeteer_copy");
const port = process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post("/video", async (req, res) => {
  const { videoName, semanaName, newSemanaName, time, widthScreen, heightScreen, widthHoverButton, heightHoverButton } = req.body;
  const data = await runner(videoName, semanaName, newSemanaName, time, widthScreen, heightScreen, widthHoverButton, heightHoverButton);
  return res.json({ data });
});

// app.post("/videoalternativa", async (req, res) => {
//   const { arraySemana, semanaName, widthScreen, heightScreen, widthHoverButton, heightHoverButton } = req.body;
//   setTimeout(async () => {
//     await alternativapuppeter(arraySemana, semanaName, widthScreen, heightScreen, widthHoverButton, heightHoverButton);
//   }, 1000);
//   return res.json({ "data": "hcytfuyfuy" });
// });


// app.listen(port, () =>
//   console.log(`Example app listening on port ${port}!`)
// );



// const puppeteer = require("puppeteer");
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");

/// Variables globales
var browser;
var page;
var stream;
var frame;
var file;
var arraySemana = [];
var positionArraySemanaD = 0;
// const runner = require("./puppeteer_copy");
// const port = process.env.PORT || 8080;
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post("/videoalternativa", async (req, res) => {
  const { arraySemanaD, semanaName, widthScreen, heightScreen, widthHoverButton, heightHoverButton } = req.body;
  resetAll();
  arraySemana = arraySemanaD;
  setTimeout(async () => {
    await alternativapuppeter([], semanaName, widthScreen, heightScreen, widthHoverButton, heightHoverButton);
  }, 1000);
  return res.json({ "data": "hcytfuyfuy" });
});
app.post("/exe", async (req, res) => {
  const {
    clickVideo,
    clickPlayVideo,
    clickExpanded,
    clickClose,
    clickStream,
    clickRecording,
    positionArraySemana,
    clickCloseAll,
    clickEsc,
    pageOrFrame
  } = req.body;
  if (clickVideo) { await clickVideoF(positionArraySemana) }
  if (clickExpanded) { await clickExpandedF() }
  if (clickEsc) { await clickEscF(pageOrFrame) };
  if (clickPlayVideo) { await clickPlayVideoF() }
  if (clickClose) { await clickCloseF() }
  if (clickRecording) { await clickStreamAndRecordingF() }
  if (clickCloseAll) { await clickCloseAllF() }
  return res.json({ "data": "hcytfuyfuy" });
});

// positionArraySemanaD = positionArraySemana;
async function clickVideoF(pos) {

  console.log("3.3 Click al video");
  //BORRAR
  await delay(2000);
  videoName = arraySemana[pos]['videoName'];
  // Creamos la instancia para escribir en el arhivo
  videoNameNotSpace = replaceAll(videoName, " ", "");
  file = fs.createWriteStream(`${videoNameNotSpace}.webm`);

  // console.log("TIME : " + timeTime)
  const newSemanaName = arraySemana[pos]['newSemanaName'];
  if (pos === 0) {
    await page.waitForSelector(`div.folderitem.videoitem[file="${newSemanaName}"]`);
    await page.click(`div.folderitem.videoitem[file="${newSemanaName}"]`);
    stream = await getStream(page, { audio: true, video: true });
  } else {
    console.log("3.3 Entrando a la Semana");
    stream = await getStream(page, { audio: true, video: true });
  }
  // stream = await getStream(page, { audio: true, video: true });
}
async function clickExpandedF() {
  console.log("3.3 Click Expanded");
  console.log('before waiting');
  await delay(10000);
  console.log('after waiting');
  // Hacer grande la pantala video -------------
  const elementHandle = await page.waitForSelector('div#videocontent > iframe');
  frame = await elementHandle.contentFrame();
  let validar = true;
  let position = ["9", "9", "10", "10"];
  let position2 = ["last", "first", "last", "first"];
  let contPosition = 0;
  while (validar) {
    if (contPosition === 4) {
      break;
    } else {
      validar = await expandVideo(frame, position[contPosition], position2[contPosition]);
      if (validar === false) {
        return true;
      }
    }
    contPosition++;
  }
  return validar;
}
async function clickEscF(pageOrFrame) {
  if (pageOrFrame) {
    await page.keyboard.press("Escape");
  } else {
    await frame.keyboard.press("Escape");
  }
  // Hacer grande la pantala video -------------
}
async function clickPlayVideoF() {
  // const elementHandle = await page.waitForSelector('div#videocontent > iframe');
  // frame = await elementHandle.contentFrame();
  const elementHandle = await page.waitForSelector('div#videocontent > iframe');
  frame = await elementHandle.contentFrame();

  if (await playVideo(frame)) {
    await Promise.all([
      frame.waitForSelector('div.fwdevp:last-child > div:nth-child(13)'),
      frame.click('div.fwdevp:last-child > div:nth-child(13)'),
    ]);
    return true;
  } else {
    return true;
  }
}
async function clickCloseF() {
  await Promise.all([
    page.waitForSelector('div.closebot'),
    page.click('div.closebot'),
  ]);
}
async function clickStreamAndRecordingF() {
  await delay(2000);
  // Empezamos a grabar la pantalla
}
async function clickCloseAllF() {
  console.log("serramos el stream y el file")
  // Destruimos el strem del video
  await stream.destroy();
  // Cerramos la instancia al archivo
  file.close();
}

var contsecond = 0;
var intervalTime;
var valuateInterval = [];
var valuateclickVideo = [];
var valuateclickClose = [];
var contadorVideos = 0;
var truevaluateClickVideo = false;
function resetAll() {
  browser = null;
  page = null;
  stream = null;
  frame = null;
  file = null;
  arraySemana = [];
  positionArraySemanaD = 0;
  contsecond = 0;
  intervalTime = null;
  valuateInterval = [];
  valuateclickVideo = [];
  valuateclickClose = [];
  contadorVideos = 0;
  truevaluateClickVideo = false;
}
async function exeF() {
  // Funcion para terminar todo
  async function limpiar(subirVideoafirestore, videoNameNotSpace, videoName, semanaName) {
    try {
      // Destruimos el strem del video
      await clickCloseAllF()
    } catch (e) {
      notification(`Errpr: ${videoName}`)
      // Cerramos la instancia al archivo
      file.close();
      // Cerramos la pagina
      await page.close();
      console.log("Subir Archivo");
      // Cerramos el navegador
      await browser.close();
      console.log("Cannot cleanup istances");
    }
    if (subirVideoafirestore) {
      try {
        // Subimos el archivo
        await sa.subirVideo(videoNameNotSpace, videoName, semanaName);
        notification(videoName);

        console.log("Se subio el archivo correctamente")
        setTimeout(async () => {
          console.log("archivo eliminado correctamente");
          const filePath = __dirname + `/${videoNameNotSpace}.webm`;
          fs.unlinkSync(filePath);
        }, 60000);
      } catch (error) {
        console.log("error al subir archivo")
      }
    }
  }

  for (let j = 0; j < arraySemana.length + 1; j++) {
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
        contadorVideos++
        console.log("termino todo")
        // await stream.destroy();

        console.log("Listo termino todo ::: " + contadorVideos)
        // Cerramos la pagina
        await page.close();
        console.log("Subir Archivo");
        // Cerramos el navegador
        await browser.close();
        clearInterval(intervalTime);
        // setTimeout(async () => {
        //     notification(videoName);

        // }, arraytimeTime[i] + 2000);
      } else {


        if (contadorVideos < arraySemana.length) {
          let i = contadorVideos;
          if (valuateclickVideo[i]) {
            console.log("Click Video ::: " + i)
            if (i < arraySemana.length) {
              valuateclickVideo[i] = false;
              valuateclickVideo[i + 1] = true;
            }

            await clickStreamAndRecordingF();
            // await delay(3000)
            await clickVideoF(i);

            // console.log("Click Expanded ::: " + i)
            if (await clickExpandedF()) {
              await clickPlayVideoF()
              console.log("recording");
              stream.pipe(file);
              truevaluateClickVideo = true;
            }
          }
          if (truevaluateClickVideo) {
            const element = arraySemana[i];
            let videoName = element['videoName'];
            // Creamos la instancia para escribir en el arhivo
            // let videoNameNotSpace = replaceAll(videoName, " ", "");
            const nameVideoEvaluate = await frame.$eval('div.fwdevp-time', element => element.innerHTML);
            const splitnameVideoEvaluate = nameVideoEvaluate.split("/");
            let timeOriginal = element['time']
            let timeVideo = splitnameVideoEvaluate[0];
            const numtimeTime = timeConvert(timeVideo);
            // console.log(numtimeTime)
            // console.log(timeConvert(timeOriginal))
            if (numtimeTime >= (timeConvert(timeOriginal) - 3000)) {
              if (valuateInterval[i]) {
                if (i < arraySemana.length) {
                  valuateInterval[i] = false;
                  valuateInterval[i + 1] = true;
                }
                truevaluateClickVideo = false;
                const element = arraySemana[i];
                let videoName = element['videoName'];
                // Creamos la instancia para escribir en el arhivo
                let videoNameNotSpace = replaceAll(videoName, " ", "");
                await limpiar(true, videoNameNotSpace, videoName, element['semanaName'], i);
                contadorVideos++;
              }
              console.log("Video + : " + i);
            }
            // if (valuateclickClose[i]) {
            //   console.log("Click Close Strram ::: " + i)
            //   if (i < arraySemana.length) {
            //     valuateclickClose[i] = false;
            //     valuateclickClose[i + 1] = true;
            //   }
            //   await clickStreamAndRecordingF();
            //   // valuateclickVideo[i] = false;
            //   // valuateclickVideo[i + 1] = true;
            // }
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, 1000);
  // if (i < arraySemana.length - 1) {

  // }
  // await delay(10000);
  // setTimeout(async () => {
  //   clickCloseAllF();
  //   await delay(2000);
  //   await delay(10000);
  // }, timeTime);

  // } catch (error) {
  //   console.log(error);

  // }
  // }
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  notification("Server Iniciado Correctamente")
}
);
var request = require('request');

const sa = require('./subirArchivo.js');
const { getStream, launch } = require("puppeteer-stream");
const fs = require("fs");

// Instancia del navegador
var browser;
const alternativapuppeter = async (arraySemanaD, semanaName, widthScreen, heightScreen, widthHoverButton, heightHoverButton) => {
  var videoName = "no esta definido";
  console.log("Abrimos el navegador");
  browser = await openbrowser(browser);
  if (browser === "") {
    notification(`Error: ${videoName}`);
    return { "error": "abrir navegador" }
  } else {
    console.log("Abrimos la pagina")
    // Abrimos una nueva pagina
    page = await browser.newPage();
    page.setViewport({ width: widthScreen, height: heightScreen });
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

        // let validarCurso = true;
        // let contPositionCurso = 1;
        // while (validarCurso) {
        //   if (contPositionCurso === 4) {
        //     break;
        //   } else {
        //     validarCurso = await clickCursoMenu(page, contPositionCurso);
        //   }
        //   contPositionCurso++;
        // }

        // await Promise.all([
        //   console.log("2.3. Entrando a hover unreal"),
        //   page.waitForSelector(`li[onmouseup="window.location='/campus//setcur.php?c=125';"]`),
        //   page.click(`li[onmouseup="window.location='/campus//setcur.php?c=125';"]`)
        // ])
        await Promise.all([
          page.mouse.click(widthHoverButton, heightHoverButton),
          page.waitForNavigation()
        ]);

        console.log("3.3 Entrando a la Semana");
        await page.waitForSelector(`div[name='${semanaName}']`)
        await page.click(`div[name='${semanaName}']`);
        // notification("Listo EXE");
        exeF();
      } catch (error) {
        console.log(error)
        return {
          "Error": `${error.toString()}`
        }
      }
    } catch (err) {
      console.log(err)
      return {
        "Error": `${err.toString()}`
      }
    }
    console.log("Termino todo")
    return {
      "videoName": `${videoName}`,
      "semanaName": `${semanaName}`,
      "time": `jsnjnd`
    }
  }
};
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

/// abrir browser support
const openbrowser = async () => {
  try {
    let brown = await launch({
      // Ejecutable en linux
      executablePath: "/usr/bin/microsoft-edge-stable",
      // Ejecutable en Windows
      // executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
      headless: false,
      timeout: 0,
      defaultViewport: null,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    return brown;
  } catch (error) {
    console.log(error);
    return "";
  }
};
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
    console.log(error);
    return true;
  }
}
const clickCursoMenu = async (page, int) => {
  try {
    await Promise.all([
      console.log("3.1 Entrado a los videos"),
      page.waitForSelector(`li.menuop1.menutri.animate1s ul#cursosmenu.centerh.shadow.cursosmenu > li:nth-child(2)`),
      page.click(`li.menuop1.menutri.animate1s ul#cursosmenu.centerh.shadow.cursosmenu > li:nth-child(2)`),
    ]);
    console.log("No hay errores");
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
    return (secs) * 1000;
  }
}

const notification = (videoName) => {
  var options = {
    'method': 'POST',
    'url': 'https://fcm.googleapis.com/fcm/send',
    'headers': {
      'Authorization': 'Bearer AAAAf6th6z4:APA91bHcKSO89Ikqqd8FJ29O107mDrZhZGfc2UZl559h72VmiJcHVFtC1jerxnL1BXTtMrq_OYfNb1yERN4fTCQ0i7D4CDh7NEcYFjANl0HQ8eUgR6d-gq7utE2Gt0z4LbbntL53sKlo',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "notification": {
        "body": "Video completado",
        "title": `Name: ${videoName}`
      },
      "data": {
        "body": "Remesa Autorizada id-remesa",
        "title": "La remesa del socio id-socio"
      },
      "to": "f9AaOqF_QlGZbCTzUBqAQt:APA91bFqzP-UMnu_c_hXh3Wp3g3G6t8tH42KL8Uj7K6zyhWo7hySDFEy5oD0RBdRW32RqdCTESCGlQCqFl6kVOTVLFLsEGZ4YX9djKd0X9zksgcCiMu0cZffxZk43OMra-0EXh4EvkiQ"
    })

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}


const notificationError = (videoName) => {
  var options = {
    'method': 'POST',
    'url': 'https://fcm.googleapis.com/fcm/send',
    'headers': {
      'Authorization': 'Bearer AAAAf6th6z4:APA91bHcKSO89Ikqqd8FJ29O107mDrZhZGfc2UZl559h72VmiJcHVFtC1jerxnL1BXTtMrq_OYfNb1yERN4fTCQ0i7D4CDh7NEcYFjANl0HQ8eUgR6d-gq7utE2Gt0z4LbbntL53sKlo',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "notification": {
        "body": "Video completado",
        "title": `ERROR Video: ${videoName}`
      },
      "data": {
        "body": "Remesa Autorizada id-remesa",
        "title": "La remesa del socio id-socio"
      },
      "to": "f9AaOqF_QlGZbCTzUBqAQt:APA91bFqzP-UMnu_c_hXh3Wp3g3G6t8tH42KL8Uj7K6zyhWo7hySDFEy5oD0RBdRW32RqdCTESCGlQCqFl6kVOTVLFLsEGZ4YX9djKd0X9zksgcCiMu0cZffxZk43OMra-0EXh4EvkiQ"
    })

  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}

module.exports = alternativapuppeter;
