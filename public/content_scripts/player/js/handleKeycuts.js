const actions = {
    "majorSeekForward": (player, callback) => {
        player.currentTime(player.currentTime() + parseFloat(options.majorSeekIncrement));

        afterAction(player, "majorSeekForward");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "majorSeekBackward": (player, callback) => {
        player.currentTime(player.currentTime() - parseFloat(options.majorSeekIncrement));

        afterAction(player, "majorSeekBackward");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "minorSeekForward": (player, callback) => {
        player.currentTime(player.currentTime() + parseFloat(options.minorSeekIncrement));

        afterAction(player, "minorSeekForward");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "minorSeekBackward": (player, callback) => {
        player.currentTime(player.currentTime() - parseFloat(options.minorSeekIncrement));

        afterAction(player, "minorSeekBackward");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "playPause": (player, callback) => {
        if (player.paused()) {
            player.play();
            afterAction(player, "play");
        } else {
            player.pause();
            afterAction(player, "pause");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "pause": (player, callback) => {
        player.pause();

        afterAction(player, "pause");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "toggleFullscreen": (player, callback) => {
        if (player.isFullscreen()) {
            player.exitFullscreen();
            afterAction(player, "exitFullscreen");
        } else {
            player.requestFullscreen();
            afterAction(player, "enterFullscreen");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "toggleMute": (player, callback) => {
        player.muted(!player.muted());

        if (player.muted()) {
            afterAction(player, "muted");
        } else {
            // if unmuting at zero volume, increase volume a little
            let minVolume = parseFloat(options.volumeIncrement) / 100;
            if (player.volume() < minVolume) {
                player.volume(minVolume);
            }
            afterAction(player, "unmuted");
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
            afterAction(player, "volumeMax");
        } else {
            player.volume(newVolume);
            afterAction(player, "volumeUp");
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
            afterAction(player, "muted");
        } else {
            player.muted(false);
            player.volume(newVolume);
            afterAction(player, "volumeDown");
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
            afterAction(player, "speedUp");
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
            afterAction(player, "slowDown");
        }

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    "resetSpeed": (player, callback) => {
        player.playbackRate(parseFloat(options.defaultSpeed));

        afterAction(player, "resetSpeed");

        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
}

function afterAction(player, action) {

    if (options.showControlsOnShortcut) {
        showStatusIcon(player, action);
    }
}

function showStatusIcon(player, action) {
    if (statusIcons[action]) {
        let iconContainer = document.getElementById("bvrv-status-icon-container");
        iconContainer.classList.remove("bvrv-fade-out");


        let statusValue = document.getElementById("bvrv-status-value");
        if (action in formattedValues) {
            statusValue.innerText = formattedValues[action](player);

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
        icon.src = statusIcons[action];

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
