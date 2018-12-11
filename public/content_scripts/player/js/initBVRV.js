function initBVRV(player) {
    player.playbackRate(options.defaultSpeed);
    player.volume(parseFloat(options.defaultVolume / 100));
    player.muted(options.muteByDefault);

    // window.onload = () => stylePlayer(options);

    document.onkeydown = (e) => handleKeycuts(player, e);
}

const actions = {
    "majorSeekForward": (player, callback) => {
        player.currentTime(player.currentTime() + parseFloat(options.majorSeekIncrement));

        afterAction("majorSeekForward");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "majorSeekBackward": (player, callback) => {
        player.currentTime(player.currentTime() - parseFloat(options.majorSeekIncrement));

        afterAction("majorSeekBackward");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "minorSeekForward": (player, callback) => {
        player.currentTime(player.currentTime() + parseFloat(options.minorSeekIncrement));

        afterAction("minorSeekForward");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "minorSeekBackward": (player, callback) => {
        player.currentTime(player.currentTime() - parseFloat(options.minorSeekIncrement));

        afterAction("minorSeekBackward");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "playPause": (player, callback) => {
        if (player.paused()) {
            player.play();
            afterAction("play");
        } else {
            player.pause();
            afterAction("pause");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "pause": (player, callback) => {
        player.pause();

        afterAction("pause");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "toggleFullscreen": (player, callback) => {
        if (player.isFullscreen()) {
            player.exitFullscreen();
            afterAction("exitFullscreen");
        } else {
            player.requestFullscreen();
            afterAction("enterFullscreen");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "toggleMute": (player, callback) => {
        player.muted(!player.muted());

        if (player.muted()) {
            afterAction("muted");
        } else {
            // if unmuting at zero volume, increase volume a little
            let minVolume = parseFloat(options.volumeIncrement) / 100;
            if (player.volume() < minVolume) {
                player.volume(minVolume);
            }
            afterAction("unmuted");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "volumeUp": (player, callback) => {
        let newVolume = player.volume() + (parseFloat(options.volumeIncrement) / 100);
        player.muted(false);
        if (newVolume >= 1) {
            // clip the volume
            player.volume(1);
            afterAction("volumeMax");
        } else {
            player.volume(newVolume);
            afterAction("volumeUp");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "volumeDown": (player, callback) => {
        let newVolume = player.volume() - (parseFloat(options.volumeIncrement) / 100);
        if (newVolume < .01) {
            // clip the volume and mute
            player.muted(true);
            player.volume(0);
            afterAction("muted");
        } else {
            player.muted(false);
            player.volume(newVolume);
            afterAction("volumeDown");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "speedUp": (player, callback) => {
        let newSpeed = player.playbackRate() + parseFloat(options.speedIncrement);
        if (newSpeed > 16) {
            // clip the speed
            player.playbackRate(16);
        } else {
            player.playbackRate(newSpeed);
            afterAction("speedUp");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "slowDown": (player, callback) => {
        let newSpeed = player.playbackRate() - parseFloat(options.speedIncrement);
        if (newSpeed < 0) {
            // clip the speed
            player.playbackRate(0);
        } else {
            player.playbackRate(newSpeed);
            afterAction("slowDown");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "resetSpeed": (player, callback) => {
        player.playbackRate(parseFloat(options.defaultSpeed));

        afterAction("resetSpeed");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
}

function afterAction(action) {
    if (action === "pause") {
        // window.postMessage(
        //     {
        //         type: MESSAGE_TYPES.setValue,
        //         attribute: "userActive",
        //         value: true
        //     },
        //     "*"
        // );
    }
    if (options.showControlsOnShortcut) {
        // showStatusIcon(action);
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
        // icon.src = chrome.extension.getURL(STATUS_ICONS[action]);

        void iconContainer.offsetWidth;
        iconContainer.classList.add("bvrv-fade-out");
    }
}

function executeKeyAction(player, event, modifier) {
    let keyCode = event.keyCode;

    if (modifier) {
        // a modifier is present
        if (!!reverseKeyMap[modifier]) {
            // there are bindings for the modifier
            if (!!reverseKeyMap[modifier][keyCode]) {
                // there is a binding for the modifier and pressed key
                actions[reverseKeyMap[modifier][keyCode]](player);
            }
        }
    } else {
        if (!!reverseKeyMap[keyCode]) actions[reverseKeyMap[keyCode]](player);
    }

    event.stopPropagation();
    event.preventDefault();
}

function handleKeycuts(player, e) {
    if (e.ctrlKey && e.keyCode !== MOD_KEY.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        // just the control key and another key
        executeKeyAction(player, e, MOD_KEY.ctrlKey);
    } else if (e.shiftKey && e.keyCode !== MOD_KEY.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // just the shift key and another key
        executeKeyAction(player, e, MOD_KEY.shiftKey);
    } else if (e.altKey && e.keyCode !== MOD_KEY.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        // just the alt key and another key
        executeKeyAction(player, e, MOD_KEY.altKey);
    } else if (!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        // no modifiers, just a normal key
        executeKeyAction(player, e);
    }
}
