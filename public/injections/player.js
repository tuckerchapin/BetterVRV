let vrvPlayer = document.querySelector("video#player_html5_api");
console.log(actions);
chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        // Fired on user interaction
        document.onkeydown = (e) => handleKeycuts(options, e);

        // Fired at start
        actions.resetSpeed(options);
    }
);
