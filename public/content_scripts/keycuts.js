const actions = {
    "majorSeekForward": (options, callback) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime + parseFloat(options.majorSeekIncrement);

        afterAction("majorSeekForward", options);

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "majorSeekBackward": (options, callback) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime - parseFloat(options.majorSeekIncrement);

        afterAction("majorSeekBackward", options);

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "minorSeekForward": (options, callback) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime + parseFloat(options.minorSeekIncrement);

        afterAction("minorSeekForward", options);

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "minorSeekBackward": (options, callback) => {
        vrvPlayer.currentTime = vrvPlayer.currentTime - parseFloat(options.minorSeekIncrement);

        afterAction("minorSeekBackward", options);

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "playPause": (options, callback) => {
        if (vrvPlayer.paused) {
            vrvPlayer.play();
            afterAction("play", options);
        } else {
            vrvPlayer.pause();
            afterAction("pause", options);
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "pause": (options, callback) => {
        vrvPlayer.pause();

        afterAction("pause", options);

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "toggleFullscreen": (options) => {
        if (document.webkitIsFullScreen) {
            document.webkitExitFullscreen();
            afterAction("exitFullscreen", options);
        } else {
            document.documentElement.webkitRequestFullscreen();
            afterAction("enterFullscreen", options);
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "toggleMute": (options, callback) => {
        vrvPlayer.muted = !vrvPlayer.muted;

        if (vrvPlayer.muted) {
            afterAction("muted", options);
        } else {
            afterAction("unmuted", options);
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "volumeUp": (options, callback) => {
        let newVolume = vrvPlayer.volume + (parseFloat(options.volumeIncrement) / 100);
        vrvPlayer.muted = false;
        if (newVolume > 1) {
            // clip the volume
            vrvPlayer.volume = 1;
            afterAction("volumeMax", options);
        } else {
            vrvPlayer.volume = newVolume;
            afterAction("volumeUp", options);
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "volumeDown": (options, callback) => {
        let newVolume = vrvPlayer.volume - (parseFloat(options.volumeIncrement) / 100);
        if (newVolume < .01) {
            // clip the volume
            vrvPlayer.muted = true;
            afterAction("muted", options);
        } else {
            vrvPlayer.muted = false;
            vrvPlayer.volume = newVolume;
            afterAction("volumeDown", options);
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "speedUp": (options, callback) => {
        let newSpeed = vrvPlayer.playbackRate + parseFloat(options.speedIncrement);
        if (newSpeed > 16) {
            // clip the speed
            vrvPlayer.playbackRate = 16;
        } else {
            vrvPlayer.playbackRate = newSpeed;
            afterAction("speedUp", options);
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "slowDown": (options, callback) => {
        let newSpeed = vrvPlayer.playbackRate - parseFloat(options.speedIncrement);
        if (newSpeed < 0) {
            // clip the speed
            vrvPlayer.playbackRate = 0;
        } else {
            vrvPlayer.playbackRate = newSpeed;
            afterAction("slowDown", options);
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "resetSpeed": (options, callback) => {
        vrvPlayer.playbackRate = parseFloat(options.defaultSpeed);

        afterAction("resetSpeed", options);

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
}

function afterAction(action, options) {
    if (options.showControlsOnShortcut) {
        showStatusIcon(action);
    }
}

function showStatusIcon(action) {
    if (STATUS_ICONS[action]) {
        let iconContainer = document.getElementById("bvrv-status-icon-container");
        iconContainer.classList.remove("bvrv-fade-out");


        let statusValue = document.getElementById("bvrv-status-value");
        if (action in FORMATTED_VALUES) {
            statusValue.innerText = FORMATTED_VALUES[action]();

            if (action.includes("Seek")) {
                statusValue.classList.remove("bvrv-status-value-below");
                statusValue.classList.add("bvrv-status-value-center");
            } else {
                statusValue.classList.remove("bvrv-status-value-center");
                statusValue.classList.add("bvrv-status-value-below");
            }
        } else {
            statusValue.innerText = "";
        }

        let icon = document.getElementById("bvrv-status-icon");
        icon.src = chrome.extension.getURL(STATUS_ICONS[action]);

        void iconContainer.offsetWidth;
        iconContainer.classList.add("bvrv-fade-out");
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
