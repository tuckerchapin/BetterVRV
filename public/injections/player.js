let vrvPlayer = document.querySelector("video#player_html5_api");

const DEFAULT_OPTIONS = {
    "hideDescriptions": true,
    "hideThumbnails": true,
    "showWatchedThumbnails": false,

    "majorSeekIncrement": 10,
    "minorSeekIncrement": 5,

    "majorSeekForward": ["16+76", ""],
    "majorSeekBackward": ["16+74", ""],
    "minorSeekForward": ["39", "76"],
    "minorSeekBackward": ["37", "74"],
    "playPause": ["32", "75"],
    "pause": ["80", ""],
    "toggleFullscreen": ["70", ""],
};

const action = {
    "majorSeekForward": (options) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime - options.majorSeekIncrement;
    },
    "majorSeekBackward": (options) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime - options.majorSeekIncrement;
    },
    "minorSeekForward": (options) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime + options.minorSeekIncrement;
    },
    "minorSeekBackward": (options) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime - options.minorSeekIncrement;
    },
    "playPause": (options) => {
        vrvPlayer.paused ? vrvPlayer.play() : vrvPlayer.pause();
    },
    "pause": (options) => {
        vrvPlayer.pause();
    },
    "toggleFullscreen": (options) => {
        document.webkitIsFullScreen ?
            document.webkitExitFullscreen() : document.documentElement.webkitRequestFullscreen();
    },
}

function getReverseKeyMap(options) {
    let reverseKeyMap = {};
    for (const [key, value] of Object.entries(options)) {
        if (Array.isArray(value) && value.length === 2) {
            if (value[0] !== "") reverseKeyMap[value[0]] = key;
            if (value[1] !== "") reverseKeyMap[value[1]] = key;
        }
    }
    return reverseKeyMap;
}

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        let reverseKeyMap = getReverseKeyMap(options);

        document.onkeydown = (e) => {
            if (!!reverseKeyMap[e.keyCode]) {
                console.log(e.keyCode, reverseKeyMap[e.keyCode], action[reverseKeyMap[e.keyCode]]);
                action[reverseKeyMap[e.keyCode]](options);
                e.stopPropagation();
                e.preventDefault();
            }
        }
    }
);
