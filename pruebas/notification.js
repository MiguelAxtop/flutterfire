
var request = require('request');
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

notification("videoName");