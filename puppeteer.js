const puppeteer = require("puppeteer");
var request = require('request');

const sa = require('./subirArchivo.js');
const { getStream, launch } = require("puppeteer-stream");
const fs = require("fs");
const runner = async (videoName, semanaName, newSemanaName, time, widthScreen, heightScreen, widthHoverButton, heightHoverButton) => {
  // Width de los botones que
  // let widthHoverButton = (912 + (widthScreen - 1080));
  // let widthHoverButton = 1377;
  console.log("Abrimos el navegador");
  // Instancia del navegador
  let browser;
  browser = await openbrowser(browser);
  if (browser === "") {
    notification("ERROR: " + videoName)
    return { "error": "abrir navegador" }
  } else {

    const timeTime = timeConvert(time);
    console.log("TIME : " + timeTime)
    // Creamos la instancia para escribir en el arhivo
    videoNameNotSpace = replaceAll(videoName, " ", "");
    const file = fs.createWriteStream(`${videoNameNotSpace}.webm`);
    // Definimos el stream para guardar pantalla
    var stream;
    console.log("Abrimos la pagina")
    // Abrimos una nueva pagina
    const page = await browser.newPage();
    page.setViewport({ width: widthScreen, height: heightScreen });
    // Funcion para terminar todo
    async function cleanup(subirVideoafirestore) {
      try {
        // Destruimos el strem del video
        await stream.destroy();
        // Cerramos la instancia al archivo
        file.close();
        // Cerramos la pagina
        await page.close();
        console.log("Subir Archivo");
        // Cerramos el navegador
        await browser.close();
        console.log("finished");
      } catch (e) {
        notificationError(videoName)
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
          sa.subirVideo(videoNameNotSpace, videoName, semanaName);
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

        console.log("3.3 Click al video");
        //BORRAR
        await delay(2000)
        ///BORRARF
        // await page.waitForSelector(`div[name='${videoName}']`)
        await page.waitForSelector(`div.folderitem.videoitem[file="${newSemanaName}"]`);
        await page.click(`div.folderitem.videoitem[file="${newSemanaName}"]`);
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
        if (await playVideo(frame)) {
          await Promise.all([
            frame.waitForSelector('div.fwdevp:last-child > div:nth-child(13)'),
            frame.click('div.fwdevp:last-child > div:nth-child(13)'),
          ]);
        }
      } catch (error) {
        console.log(error)
        cleanup(false)
        notificationError(videoName)
        return {
          "Error": `${error.toString()}`
        }
      }
    } catch (err) {
      cleanup(false)
      return {
        "Error": `${err.toString()}`
      }
    }
    // Empezamos a grabar la pantalla
    console.log("recording");
    stream.pipe(file);
    // Limpiamos despues de grabar todo
    setTimeout(async () => {
      cleanup(true)
    }, timeTime);
    return {
      "videoName": `${videoName}`,
      "semanaName": `${semanaName}`,
      "time": `${time}`
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

module.exports = runner;
