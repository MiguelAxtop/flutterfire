const puppeteer = require("puppeteer");

const sa = require('./subirArchivo.js');
const { getStream, launch } = require("puppeteer-stream");
const fs = require("fs");
const runner = async (videoName, semanaName, time, widthScreen, heightScreen, widthHoverButton, heightHoverButton) => {
  // Width de los botones que
  // let widthHoverButton = (912 + (widthScreen - 1080));
  // let widthHoverButton = 1377;
  const timeTime = timeConvert(time);
  console.log("TIME : " + timeTime)
  // Creamos la instancia para escribir en el arhivo
  videoNameNotSpace = replaceAll(videoName, " ", "");
  const file = fs.createWriteStream(`${videoNameNotSpace}.webm`);
  // Definimos el stream para guardar pantalla
  var stream;
  console.log("Abrimos el navegador");
  // Instancia del navegador
  var browser;
  browser = await launch({
    // Ejecutable en linux
    executablePath: "/usr/bin/microsoft-edge-stable",
    // Ejecutable en Windows
    // executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: false,
    timeout: 0,
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  console.log("Abrimos la pagina")
  // Abrimos una nueva pagina
  const page = await browser.newPage();
  page.setViewport({ width: widthScreen, height: heightScreen });
  // Funcion para terminar todo
  async function cleanup() {
    try {
      // Destruimos el strem del video
      await stream.destroy();
      // Cerramos la instancia al archivo
      file.close();
      // Cerramos la pagina
      await page.close();
      // Cerramos el navegador
      await browser.close();
      console.log("finished");
    } catch (e) {
      console.log("Cannot cleanup istances");
    }
    try {
      // Subimos el archivo
      console.log("Subir Archivo");
      sa.subirVideo(videoNameNotSpace, videoName, semanaName);
      console.log("Se subio el archivo correctamente")
    } catch (error) {
      console.log("error al subir archivo")
    }
  }
  // Configurar el tiempo de espera de la navegación
  await page.setDefaultNavigationTimeout(100000);
  console.log("1.1 Iniciando Navegador");
  await page.goto("https://www.youtube.com/watch?v=jllAGMdlXOM", {
    waitUntil: "load", timeout: 0
  });
  try {
    stream = await getStream(page, { audio: true, video: true });
    console.log("Esperando 3 segundos")
    await delay(4000);
    await Promise.all([
      console.log("2.2. Cerrar pantalla de mensaje"),

      page.waitForSelector('div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:last-child'),
      page.click('div.buttons.style-scope.ytd-consent-bump-v2-lightbox > ytd-button-renderer:last-child')
    ])
    console.log("Esperando 3 segundos")
    // await delay(3000);
    // await Promise.all([
    //   console.log("2.2. Cerrar pantalla de mensaje"),
    //   page.waitForSelector('video.video-stream.html5-main-video'),
    //   page.click('video.video-stream.html5-main-video')
    // ])

    console.log("Esperando 3 segundos")
    await delay(3000);
    await Promise.all([
      console.log("2.2. Cerrar pantalla de mensaje"),
      page.waitForSelector('button.ytp-fullscreen-button.ytp-button'),
      page.click('button.ytp-fullscreen-button.ytp-button')
    ])
  } catch (err) {
    console.log(err)
  }
  // Empezamos a grabar la pantalla
  console.log("recording");
  stream.pipe(file);
  // Limpiamos despues de grabar todo
  setTimeout(async () => {
    cleanup()
  }, timeTime);
  return {
    "videoName": `${videoName}`,
    "semanaName": `${semanaName}`,
    "time": `${time}`
  }
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
    return (secs + 20) * 1000;
  }
}

module.exports = runner;
