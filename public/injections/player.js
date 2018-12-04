const DEFAULT_OPTIONS = {
    "hideDescriptions": true,
    "hideThumbnails": true,
    "showWatchedThumbnails": false,

    "majorSeekIncrement": 10,
    "minorSeekIncrement": 5,
    "volumeIncrement": 10,
    "speedIncrement": 0.25,
    "defaultSpeed": 1,

    "toggleFullscreen": ["70", ""],
    "playPause": ["32", "75"],
    "pause": ["80", ""],

    "majorSeekForward": ["76", ""],
    "majorSeekBackward": ["74", ""],
    "minorSeekForward": ["39", "16+76"],
    "minorSeekBackward": ["37", "16+74"],

    "toggleMute": ["77", ""],
    "volumeUp": ["38", ""],
    "volumeDown": ["40", ""],

    "speedUp": ["187", ""],
    "slowDown": ["189", ""],
    "resetSpeed": ["16+48", ""],
};

const MOD_KEY = {
    "shiftKey": 16,
    "ctrlKey": 17,
    "altKey": 18,
}

const actions = {
    "majorSeekForward": (options) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime + options.majorSeekIncrement;
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
    "toggleMute": (options) => {
        vrvPlayer.muted = !vrvPlayer.muted;
    },
    "volumeUp": (options) => {
        let newVolume = vrvPlayer.volume + (options.volumeIncrement / 100);
        if (newVolume > 1) {
            // clip the volume
            vrvPlayer.volume = 1;
        } else {
            vrvPlayer.volume = newVolume;
        }
    },
    "volumeDown": (options) => {
        let newVolume = vrvPlayer.volume - (options.volumeIncrement / 100);
        if (newVolume < 0) {
            // clip the volume
            vrvPlayer.volume = 0;
        } else {
            vrvPlayer.volume = newVolume;
        }
    },
    "speedUp": (options) => {
        vrvPlayer.playbackRate = vrvPlayer.playbackRate + options.speedIncrement;
    },
    "slowDown": (options) => {
        let newSpeed = vrvPlayer.playbackRate - options.speedIncrement;
        if (newSpeed < 0) {
            // clip the speed
            vrvPlayer.playbackRate = 0;
        } else {
            vrvPlayer.playbackRate = newSpeed;
        }
    },
    "resetSpeed": (options) => {
        vrvPlayer.playbackRate = options.defaultSpeed;
    },
}

let vrvPlayer = document.querySelector("video#player_html5_api");

chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        let reverseKeyMap = getReverseKeyMap(options);

        // Fired on user interaction
        document.onkeydown = (e) => {
            if (e.ctrlKey && e.keyCode !== MOD_KEY.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
                // just the control key and another key
                callAction(actions, reverseKeyMap, options, e, MOD_KEY.ctrlKey);
            } else if (e.shiftKey && e.keyCode !== MOD_KEY.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
                // just the shift key and another key
                callAction(actions, reverseKeyMap, options, e, MOD_KEY.shiftKey);
            } else if (e.altKey && e.keyCode !== MOD_KEY.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
                // just the alt key and another key
                callAction(actions, reverseKeyMap, options, e, MOD_KEY.altKey);
            } else if (!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
                // no modifiers, just a normal key
                callAction(actions, reverseKeyMap, options, e);
            }
        }

        // Fired at start
        actions.resetSpeed(options);
    }
);

function callAction(actions, keyMap, options, event, modifier) {
    let keyCode = event.keyCode;

    if (modifier) {
        // a modifier is present
        if (!!keyMap[modifier]) {
            // there are bindings for the modifier
            if (!!keyMap[modifier][keyCode]) {
                // there is a binding for the modifier and pressed key
                actions[keyMap[modifier][keyCode]](options);
            }
        }
    } else {
        if (!!keyMap[keyCode]) actions[keyMap[keyCode]](options);
    }

    event.stopPropagation();
    event.preventDefault();
}

function getReverseKeyMap(options) {
    let reverseKeyMap = {};
    for (const [key, value] of Object.entries(options)) {
        if (Array.isArray(value) && value.length === 2) {
            if (value[0] !== "") {
                if (String(value[0]).indexOf("+") !== -1) {
                    // command uses modifier
                    let [modifier, keystroke] = String(value[0]).split("+");
                    if (!reverseKeyMap[modifier]) {
                        // mod dictionary empty
                        reverseKeyMap[modifier] = {};
                    }
                    reverseKeyMap[modifier][keystroke] = key
                } else {
                    // no modifier
                    reverseKeyMap[value[0]] = key;
                }
            }
            if (value[1] !== "") {
                if (String(value[1]).indexOf("+") !== -1) {
                    // command uses modifier
                    let [modifier, keystroke] = String(value[1]).split("+");
                    if (!reverseKeyMap[modifier]) {
                        // mod dictionary empty
                        reverseKeyMap[modifier] = {};
                    }
                    reverseKeyMap[modifier][keystroke] = key
                } else {
                    // no modifier
                    reverseKeyMap[value[1]] = key;
                }
            }
        }
    }
    return reverseKeyMap;
}
