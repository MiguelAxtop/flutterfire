/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var request = require('request');

generateVideo = (req, res) => {
    const body = req.body;
    let sumTimeDate = 0;
    let nombres = "";
    let guardarString = "";
    try {
        // Set the date we're counting down to
        var countDownDate = new Date(Date.now()).getTime();
        setInterval(function segundossd() {


            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            console.log(hours + "h "
                + minutes + "m " + seconds + "s ");

        }, 1000);
        for (let i = 0; i < body.length; i++) {
            const { videoName, semanaName, newSemanaName, time } = body[i];
            const timeTime = timeConvert(time);
            // Ejecutamos la funcion
            if (i == 0) {
                // sumTimeDate = sumTimeDate + timeTime + 300000;
                sumTimeDate = sumTimeDate + timeTime;
                const nowDateddgdgz = Date(Date.now());
                nombres += ":::" + videoName + "Fecha: " + `Video Generado entre(${nowDateddgdgz})`;
                guardarString = fechaPrint(sumTimeDate, guardarString);
                nombres += ` - (${guardarString}\n`;
                // subirVideos(videoName, semanaName, newSemanaName, time)
            } else {
                setTimeout(async () => {
                    // subirVideos(videoName, semanaName, newSemanaName, time)
                    console.log(videoName);
                }, sumTimeDate);
                // sumTimeDate = sumTimeDate + timeTime + 300000;
                sumTimeDate = sumTimeDate + timeTime;
                nombres += ":::" + videoName + "Fecha: " + `Video Generado entre(${guardarString})`;
                guardarString = fechaPrint(sumTimeDate, guardarString);
                nombres += ` - (${guardarString}\n`;
            }
        }
    } catch (e) {
        console.log(e);
    }
    let message = nombres;
    console.log(message);
    // res.status(200).send(message);
};

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


function fechaPrint(sumTime, guardarString) {
    const currentTimeAsMs = Date.now();
    const adjustedTimeAsMs = currentTimeAsMs + sumTime;
    // create a new Date object, using the adjusted time
    const adjustedDateObj = new Date(adjustedTimeAsMs);
    if (guardarString !== "") {
        // console.log(`console.log(Video Generado entre(${guardarString}) - (${adjustedDateObj})`);
    } else {
        // console.log(`console.log(Video Generado entre(${nowDateddgdgz}) - (${adjustedDateObj}));`)
    }
    return adjustedDateObj;

}

generateVideo({
    "body": [
        {
            "videoName": "03 AnimationSystem 01.mp4 ",
            "semanaName": "Semana 17 Animations IK ",
            "newSemanaName": "17-Semana_17_Animations_IK/03_AnimationSystem_01.mp4",
            "time": "01:05"
        },
        {
            "videoName": "04 AnimationSystem 02.mp4 ",
            "semanaName": "Semana 17 Animations IK ",
            "newSemanaName": "17-Semana_17_Animations_IK/04_AnimationSystem_02.mp4",
            "time": "01:10"
        },
        {
            "videoName": "05 AnimationsIK 01.mp4 ",
            "semanaName": "Semana 17 Animations IK ",
            "newSemanaName": "17-Semana_17_Animations_IK/05_AnimationsIK_01.mp4",
            "time": "01:15"
        },
        {
            "videoName": "06 AnimationsIK 02.mp4 ",
            "semanaName": "Semana 17 Animations IK ",
            "newSemanaName": "17-Semana_17_Animations_IK/06_AnimationsIK_02.mp4",
            "time": "01:20"
        }
    ]
})