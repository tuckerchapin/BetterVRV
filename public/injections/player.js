let vrvPlayer = document.querySelector("video#player_html5_api");

let shortcuts = {
    majorSeekForward: "KeyL",
    majorSeekBackward: "KeyJ",
    minorSeekForward: "ArrowRight",
    minorSeekBackward: "ArrowLeft",
    playPause: "KeyK",
    pause: "KeyP",
    toggleFullscreen: "KeyF",
}

let settings = {
    majorSeekIncrement: 10,
    minorSeekIncrement: 5,
}

let debugLog = false;

document.onkeydown = (e) => {
    switch (e.code) {
        case shortcuts.majorSeekForward:
            if (debugLog) console.log(`Skipped forward ${settings.majorSeekIncrement}s.`);
            vrvPlayer.currentTime = vrvPlayer.currentTime + settings.majorSeekIncrement;
            e.stopPropagation();
            e.preventDefault();
            break;
        case shortcuts.majorSeekBackward:
            if (debugLog) console.log(`Skipped backward ${settings.majorSeekIncrement}s.`);
            vrvPlayer.currentTime = vrvPlayer.currentTime - settings.majorSeekIncrement;
            e.stopPropagation();
            e.preventDefault();
            break;
        case shortcuts.minorSeekForward:
            if (debugLog) console.log(`Skipped forward ${settings.minorSeekIncrement}s.`);
            vrvPlayer.currentTime = vrvPlayer.currentTime + settings.minorSeekIncrement;
            e.stopPropagation();
            e.preventDefault();
            break;
        case shortcuts.minorSeekBackward:
            if (debugLog) console.log(`Skipped backward ${settings.minorSeekIncrement}s.`);
            vrvPlayer.currentTime = vrvPlayer.currentTime - settings.minorSeekIncrement;
            e.stopPropagation();
            e.preventDefault();
            break;
        case shortcuts.playPause:
            if (debugLog) console.log(`Play/pause toggle used to ${vrvPlayer.paused ? "play" : "pause"}.`)
            vrvPlayer.paused ? vrvPlayer.play() : vrvPlayer.pause();
            e.stopPropagation();
            e.preventDefault();
            break;
        case shortcuts.pause:
            if (debugLog) console.log("Paused.");
            vrvPlayer.pause();
            e.stopPropagation();
            e.preventDefault();
            break;
        case shortcuts.toggleFullscreen:
            document.webkitIsFullScreen ? document.webkitExitFullscreen() : document.documentElement.webkitEnterFullscreen();
            e.stopPropagation();
            e.preventDefault();
    }
};
