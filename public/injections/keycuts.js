const actions = {
    "majorSeekForward": (options, callback) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime + parseFloat(options.majorSeekIncrement);

        afterAction(callback);
    },
    "majorSeekBackward": (options, callback) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime - parseFloat(options.majorSeekIncrement);

        afterAction(callback);
    },
    "minorSeekForward": (options, callback) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime + parseFloat(options.minorSeekIncrement);

        afterAction(callback);
    },
    "minorSeekBackward": (options, callback) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime - parseFloat(options.minorSeekIncrement);

        afterAction(callback);
    },
    "playPause": (options, callback) => {
        vrvPlayer.paused ? vrvPlayer.play() : vrvPlayer.pause();

        afterAction(callback);
    },
    "pause": (options, callback) => {
        vrvPlayer.pause();

        afterAction(callback);
    },
    "toggleFullscreen": (options) => {
        document.webkitIsFullScreen ?
            document.webkitExitFullscreen() : document.documentElement.webkitRequestFullscreen();

        afterAction(callback);
    },
    "toggleMute": (options, callback) => {
        vrvPlayer.muted = !vrvPlayer.muted;

        afterAction(callback);
    },
    "volumeUp": (options, callback) => {
        let newVolume = vrvPlayer.volume + (parseFloat(options.volumeIncrement) / 100);
        if (newVolume > 1) {
            // clip the volume
            vrvPlayer.volume = 1;
        } else {
            vrvPlayer.volume = newVolume;
        }

        afterAction(callback);
    },
    "volumeDown": (options, callback) => {
        let newVolume = vrvPlayer.volume - (parseFloat(options.volumeIncrement) / 100);
        if (newVolume < 0) {
            // clip the volume
            vrvPlayer.volume = 0;
        } else {
            vrvPlayer.volume = newVolume;
        }

        afterAction(callback);
    },
    "speedUp": (options, callback) => {
        let newSpeed = vrvPlayer.playbackRate + parseFloat(options.speedIncrement);
        if (newSpeed > 16) {
            // clip the speed
            vrvPlayer.playbackRate = 16;
        } else {
            vrvPlayer.playbackRate = newSpeed;
        }

        afterAction(callback);
    },
    "slowDown": (options, callback) => {
        let newSpeed = vrvPlayer.playbackRate - parseFloat(options.speedIncrement);
        if (newSpeed < 0) {
            // clip the speed
            vrvPlayer.playbackRate = 0;
        } else {
            vrvPlayer.playbackRate = newSpeed;
        }

        afterAction(callback);
    },
    "resetSpeed": (options, callback) => {
        vrvPlayer.playbackRate = parseFloat(options.defaultSpeed);

        afterAction(callback);
    },
}

function afterAction(callback) {
    document.querySelector("div#player").dispatchEvent(new Event("useractive", {"bubbles": true}));

    if (!!callback) {
        console.log("ruh roh")
        callback();
    }
}

function executeKeyAction(actions, keyMap, options, event, modifier) {
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

function handleKeycuts(options, e) {
    let reverseKeyMap = getReverseKeyMap(options);

    if (e.ctrlKey && e.keyCode !== MOD_KEY.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        // just the control key and another key
        executeKeyAction(actions, reverseKeyMap, options, e, MOD_KEY.ctrlKey);
    } else if (e.shiftKey && e.keyCode !== MOD_KEY.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // just the shift key and another key
        executeKeyAction(actions, reverseKeyMap, options, e, MOD_KEY.shiftKey);
    } else if (e.altKey && e.keyCode !== MOD_KEY.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        // just the alt key and another key
        executeKeyAction(actions, reverseKeyMap, options, e, MOD_KEY.altKey);
    } else if (!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        // no modifiers, just a normal key
        executeKeyAction(actions, reverseKeyMap, options, e);
    }
}
