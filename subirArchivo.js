const { Storage } = require("@google-cloud/storage");
const getPathServiceAccount = require('./serviceAccount/getPathServiceAccount')


// //Recibo de Remesas
module.exports.subirVideo = async (fileName, videoName, semanaName) => {
    // const subirVideo = async (fileName, videoName, semanaName) => {
    const storage = new Storage({
        keyFilename: getPathServiceAccount(),
        projectId: 'chromatic-night-339004'
    });
    // Definimos los datos
    const filePath = __dirname + `/${fileName}.webm`;
    const bucketName = 'chromatic-night-339004_cloudbuild';
    const destFileName = `${semanaName}/${fileName}.webm`;

    // Subimos los datos a Google Storage
    await storage.bucket(bucketName).upload(filePath, {
        destination: destFileName,
    });
}
// subirVideo("Animations01.mp4", "", "Semana Retarget polishing 16 ")
// Subir Video A Youtube
// const fs = require('fs');
// const { google } = require('googleapis');

// // Login a google
// var oauth2Client = new google.auth.OAuth2(
//     '239078665448-aac3er240ohk6j6gdco6a5onp2aku4t8.apps.googleusercontent.com',
//     // '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'
//     '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'
// );

// oauth2Client.setCredentials({
//     access_token: 'ya29.A0ARrdaM-FsRiN_gwq2nEu0jTctowpl43HMOqODv7yYcO_qK3lTe1Xuvhb4ErprDzxU114oeeBtPbCaRo0dkINGoWNhr-f2Agz0uNBowctmIwUWSW8hsRcBAG4FlKKN-KaHb2ItJk67Ni6PDCvBG0gqPTVujke',
//     refresh_token: '1//04X7dy5GUrjNpCgYIARAAGAQSNwF-L9IrbRXL8dmSLYXvOCm4Inpl5DvByeWHRtncGT35kzq0MX6YX2RxFk_bGuir85oLLhhjc-w',
// })

// google.options({ auth: oauth2Client }, function (err, res) {
//     console.log("google Options")
//     if (err) throw err;
//     console.log(res);
// })

// var youtube = google.youtube('v3');

// var options = {
//     auth: oauth2Client,
//     part: "snippet,status",
//     requestBody: {
//         snippet: {
//             title: "Subida desde Youtube AAPI",
//             description: "La subida desde NodeJs"
//         },
//         status: {
//             privacyStatus: "private"
//         }
//     },
//     media: {
//         body: fs.createReadStream('test.mp4')
//     }
// }

// youtube.videos.insert(options, function (err, data) {
//     console.log("Youtube Videos")
//     if (err) throw err;
//     console.log(data)
// })

// import { upload } from 'youtube-videos-uploader' //Typescript
//OR
// const { upload } = require('youtube-videos-uploader'); //vanilla javascript

// module.exports.subirVideoYoutube = async (fileName, videoName, semanaName) => {
//     // recoveryemail is optional, only required to bypass login with recovery email if prompted for confirmation
//     const credentials = { email: 'xhpruebasserver@gmail.com', pass: 'r3l86lf1CZQK', recoveryemail: 'xhcosas@gmail.com' }
//     const onVideoUploadSuccess = (videoUrl) => {
//         console.log(`----- Video: ${videoUrl} Subido Correctamente -----------`)
//     }
//     // Extra options like tags, thumbnail, language, playlist etc
//     const video = {
//         path: `${fileName}.webm`,
//         title: videoName,
//         description: `Semana: ${semanaName} video: ${videoName}`,
//         thumbnail: 'tum.png',
//         language: 'english',
//         tags: ['video', 'github'],
//         playlist: `${videoName}`,
//         onSuccess: onVideoUploadSuccess,
//         skipProcessingWait: true,
//         onProgress: (progress) => { console.log('progress', progress) }
//     }

//     // OR
//     // This package uses Puppeteer, you can also pass Puppeteer launch configuration
//     upload(credentials, [video], {
//         // Ejecutable en linux
//         executablePath: "/usr/bin/microsoft-edge-stable",
//         // Ejecutable en Windows
//         // executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
//         headless: false,
//         // product: "firefox",
//         timeout: 0,
//         args: ["--no-sandbox", "--disable-setuid-sandbox"]
//     }).then(console.log)
// }