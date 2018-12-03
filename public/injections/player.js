// let shortcuts = {
//     majorSeekForward: "KeyL",
//     majorSeekBackward: "KeyJ",
//     minorSeekForward: "ArrowRight",
//     minorSeekBackward: "ArrowLeft",
//     playPause: "KeyK",
//     pause: "KeyP",
//     toggleFullscreen: "KeyF",
// }
//
// let settings = {
//     majorSeekIncrement: 10,
//     minorSeekIncrement: 5,
// }
//
// let debugLog = false;
//
// document.onkeydown = (e) => {
//     switch (e.code) {
//         case shortcuts.majorSeekForward:
//             if (debugLog) console.log(`Skipped forward ${settings.majorSeekIncrement}s.`);
//             vrvPlayer.currentTime = vrvPlayer.currentTime + settings.majorSeekIncrement;
//             e.stopPropagation();
//             e.preventDefault();
//             break;
//         case shortcuts.majorSeekBackward:
//             if (debugLog) console.log(`Skipped backward ${settings.majorSeekIncrement}s.`);
//             vrvPlayer.currentTime = vrvPlayer.currentTime - settings.majorSeekIncrement;
//             e.stopPropagation();
//             e.preventDefault();
//             break;
//         case shortcuts.minorSeekForward:
//             if (debugLog) console.log(`Skipped forward ${settings.minorSeekIncrement}s.`);
//             vrvPlayer.currentTime = vrvPlayer.currentTime + settings.minorSeekIncrement;
//             e.stopPropagation();
//             e.preventDefault();
//             break;
//         case shortcuts.minorSeekBackward:
//             if (debugLog) console.log(`Skipped backward ${settings.minorSeekIncrement}s.`);
//             vrvPlayer.currentTime = vrvPlayer.currentTime - settings.minorSeekIncrement;
//             e.stopPropagation();
//             e.preventDefault();
//             break;
//         case shortcuts.playPause:
//             if (debugLog) console.log(`Play/pause toggle used to ${vrvPlayer.paused ? "play" : "pause"}.`)
//             vrvPlayer.paused ? vrvPlayer.play() : vrvPlayer.pause();
//             e.stopPropagation();
//             e.preventDefault();
//             break;
//         case shortcuts.pause:
//             if (debugLog) console.log("Paused.");
//             vrvPlayer.pause();
//             e.stopPropagation();
//             e.preventDefault();
//             break;
//         case shortcuts.toggleFullscreen:
//             document.webkitIsFullScreen ?
//                 document.webkitExitFullscreen() : document.documentElement.webkitRequestFullscreen();
//             e.stopPropagation();
//             e.preventDefault();
//     }
// };

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
        let vrvPlayer = document.querySelector("video#player_html5_api");
        let reverseKeyMap = getReverseKeyMap(options);

        console.log(reverseKeyMap);
    }
);
