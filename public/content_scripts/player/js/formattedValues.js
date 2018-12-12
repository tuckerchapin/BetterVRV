function getSpeed(player) {
    return String(parseFloat(player.playbackRate()).toFixed(2)) + "x";
}

function getVolume(player) {
    return String(parseInt(player.volume() * 100)) + "%";
}

function getMajorTimeSkip(player) {
    return String(parseInt(options.majorSeekIncrement)) + "s";
}

function getMinorTimeSkip(player) {
    return String(parseInt(options.minorSeekIncrement)) + "s";
}

const formattedValues = {
    "majorSeekBackward": getMajorTimeSkip,
    "majorSeekForward": getMajorTimeSkip,
    "minorSeekBackward": getMinorTimeSkip,
    "minorSeekForward": getMinorTimeSkip,
    "slowDown": getSpeed,
    "speedUp": getSpeed,
    "resetSpeed": getSpeed,
    "unmuted": getVolume,
    "volumeDown": getVolume,
    "volumeMax": getVolume,
    "volumeUp": getVolume,
    "volumeZero": getVolume,
};
