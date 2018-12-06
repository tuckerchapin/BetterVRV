function stylePlayer(options) {
    insertSpeedDisplay(options);
    insertStatusIcon(options);
}

function insertStatusIcon(options) {
    document.body.insertAdjacentHTML(
        'beforeend',
        `
        <div id="bvrv-status-icon-overlay" class="bvrv">
            <div id="bvrv-status-icon-container" class="bvrv">
                <img
                    id="bvrv-status-icon"
                    class="bvrv"
                />
            </div>
        </div>
        `
    );
}

function insertSpeedDisplay(options) {
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

    document.getElementById("bvrv-speed-display").onclick = () => actions.resetSpeed(options);
    document.getElementById("bvrv-speed-increase").onclick = () => actions.speedUp(options);
    document.getElementById("bvrv-speed-decrease").onclick = () => actions.slowDown(options);
}
