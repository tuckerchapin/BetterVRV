function stylePlayer(options) {
    let settingsButton = document.querySelector("div.settingsMenuButton.vjs-button.vjs-control");
    settingsButton.insertAdjacentHTML(
        'beforebegin',
        `
        <div id="bvrv-control-container" class="bvrv vjs-control">
            <div id="bvrv-speed-control" class="bvrv bvrv-control">
                <div id="bvrv-speed-decrease" class="bvrv bvrv-control-button"></div>
                <div id="bvrv-speed-display" class="bvrv bvrv-control-display vjs-time-control">
                    <span
                        id="bvrv-speed-value"
                        class="bvrv-control-value"
                        >${parseFloat(options.defaultSpeed).toFixed(2)}</span>
                    <span
                        id="bvrv-speed-control-unit"
                        class="bvrv-control-value-unit"
                        >×</span>
                </div>
                <div id="bvrv-speed-increase" class="bvrv bvrv-control-button"></div>
            </div>
        </div>
        `
    );

    vrvPlayer.onratechange = () => {
        document.getElementById("bvrv-speed-value").innerText = parseFloat(vrvPlayer.playbackRate).toFixed(2);
    };

    document.getElementById("bvrv-speed-value").onclick = () => actions.resetSpeed(options);
    document.getElementById("bvrv-speed-increase").onclick = () => actions.speedUp(options);
    document.getElementById("bvrv-speed-decrease").onclick = () => actions.slowDown(options);
}




















// window.onload = () => {
//     let playbackRateMenuButton = document.createElement("li");
//         playbackRateMenuButton.setAttribute("class", "vjs-menu-item playbackRateMenuButton settingsMenuItem baseSettingsMenuItem");
//         playbackRateMenuButton.setAttribute("tabindex", "-1");
//         playbackRateMenuButton.setAttribute("role", "menuitem");
//         playbackRateMenuButton.setAttribute("aria-live", "polite");
//         playbackRateMenuButton.setAttribute("aria-disabled", "false");
//         playbackRateMenuButton.innerText = "Speed";
//
//     let playbackRateIndicator = document.createElement("span");
//         playbackRateIndicator.setAttribute("id", "bvrv-playback-rate");
//         playbackRateIndicator.setAttribute("class", "qualitySelectionDetails");
//         playbackRateIndicator.innerText = "SPEED";
//
//
//     playbackRateMenuButton.appendChild(playbackRateIndicator);
//
//     // HACKY this is relying on this being the last element
//     let menu = document.getElementsByClassName("vjs-menu-content")[7];
//     menu.appendChild(playbackRateMenuButton);
//     // menu.insertBefore(playbackRateMenuButton, menu.childNodes[0] || null);
//
//     console.log(playbackRateMenuButton);
//     console.log(document.querySelector("ul.vjs-menu-content"));
// }
