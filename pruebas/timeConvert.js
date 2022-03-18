

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

console.log(timeConvert("01:00:34"))