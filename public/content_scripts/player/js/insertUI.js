function insertUI(player) {
    insertSpeedDisplay(player);
    insertStatusIcon(player);
    insertSkipIntroButton(player);
    insertSkipOutroButton(player);
    insertNextEpisodeButton(player);
}

function insertSkipIntroButton(player) {
    document.body.insertAdjacentHTML(
        'beforeend',
        `
        <div
            id="bvrv-skip-intro-button"
            class="bvrv bvrv-skip-button bvrv-skip-button-useractive bvrv-display-none"
        >
            SKIP INTRO
        </div>
        `
    );

    player.on(
        "useractive",
        () => {
            let classList = document.getElementById("bvrv-skip-intro-button").classList;
            classList.remove("bvrv-skip-button-userinactive");
            classList.add("bvrv-skip-button-useractive");
        }
    );

    player.on(
        "userinactive",
        () => {
            let classList = document.getElementById("bvrv-skip-intro-button").classList;
            classList.remove("bvrv-skip-button-useractive");
            classList.add("bvrv-skip-button-userinactive");
        }
    );
}

function insertSkipOutroButton(player) {
    document.body.insertAdjacentHTML(
        'beforeend',
        `
        <div
            id="bvrv-skip-outro-button"
            class="bvrv bvrv-skip-button bvrv-skip-button-useractive bvrv-display-none"
        >
            SKIP OUTRO
        </div>
        `
    );

    player.on(
        "useractive",
        () => {
            let classList = document.getElementById("bvrv-skip-outro-button").classList;
            classList.remove("bvrv-skip-button-userinactive");
            classList.add("bvrv-skip-button-useractive");
        }
    );

    player.on(
        "userinactive",
        () => {
            let classList = document.getElementById("bvrv-skip-outro-button").classList;
            classList.remove("bvrv-skip-button-useractive");
            classList.add("bvrv-skip-button-userinactive");
        }
    );
}

function insertNextEpisodeButton(player) {
    document.body.insertAdjacentHTML(
        'beforeend',
        `
        <div
            id="bvrv-next-episode-button"
            class="bvrv bvrv-skip-button bvrv-skip-button-useractive bvrv-display-none"
        >
            NEXT EPISODE
        </div>
        `
    );

    player.on(
        "useractive",
        () => {
            let classList = document.getElementById("bvrv-next-episode-button").classList;
            classList.remove("bvrv-skip-button-userinactive");
            classList.add("bvrv-skip-button-useractive");
        }
    );

    player.on(
        "userinactive",
        () => {
            let classList = document.getElementById("bvrv-next-episode-button").classList;
            classList.remove("bvrv-skip-button-useractive");
            classList.add("bvrv-skip-button-userinactive");
        }
    );
}

function insertStatusIcon(player) {
    document.body.insertAdjacentHTML(
        'beforeend',
        `
        <div id="bvrv-status-icon-overlay" class="bvrv">
            <div id="bvrv-status-icon-container" class="bvrv">
                <img
                    id="bvrv-status-icon"
                    class="bvrv"
                />
                <div id="bvrv-status-value" class="bvrv"></div>
            </div>
        </div>
        `
    );
}

function insertSpeedDisplay(player) {
    let settingsButton = document.getElementsByClassName("settingsMenuButton vjs-button vjs-control")[0];
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

    player.on(
        "ratechange",
        () => {
            document.getElementById("bvrv-speed-value").innerText = parseFloat(player.playbackRate()).toFixed(2);
        }
    );

    document.getElementById("bvrv-speed-display").onclick = () => actions.resetSpeed(player);
    document.getElementById("bvrv-speed-increase").onclick = () => actions.speedUp(player);
    document.getElementById("bvrv-speed-decrease").onclick = () => actions.slowDown(player);
}
