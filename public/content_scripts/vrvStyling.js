chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        if (options.hideDescriptions) {
            insertCSS("content_scripts/css/hideDescriptions.css");
        }

        if (options.hideThumbnails) {
            insertCSS("content_scripts/css/hideThumbnails.css");
        }

        if (options.showWatchedThumbnails) {
            insertCSS("content_scripts/css/showWatchedThumbnails.css");
        }

        addSettingsDropdown();
    }
);

function addSettingsDropdown() {
    checkExist = setInterval(
        () => {
            let dropdownItems = document.getElementsByClassName("erc-user-dropdown-item");
            console.log(chrome.extension.getURL("index.html"));
            if (dropdownItems.length === 8) {
                clearInterval(checkExist);

                dropdownItems[0].insertAdjacentHTML(
                    'beforebegin',
                    `
                    <a
                        href=${chrome.extension.getURL("index.html")}
                        target="_blank"
                        tabindex="0"
                        class="bvrv-dropdown-item erc-user-dropdown-item"
                    >
                        <svg class="user-dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="gear-svg">
                            <path d="M12,8.8l-2.26.94L8.8,12l.94,2.26L12,15.2l2.26-.94L15.2,12l-.94-2.26ZM6.34,17.66,4,12,6.34,6.34,12,4l5.66,2.34L20,12l-2.34,5.66L12,20ZM10.15,0,10,2.44,6.68,3.8,4.82,2.21,2.21,4.82,3.8,6.68,2.44,10,0,10.15v3.69L2.44,14,3.8,17.32l-1.6,1.86,2.61,2.61L6.68,20.2,10,21.56,10.15,24h3.69L14,21.56l3.29-1.36,1.86,1.59,2.61-2.61L20.2,17.32,21.56,14,24,13.85V10.15L21.56,10,20.2,6.68l1.59-1.86L19.18,2.21,17.32,3.8,14,2.44,13.85,0Z"></path>
                        </svg>
                        <div class="user-dropdown-info">
                            <h3 class="user-dropdown-title">BetterVRV Settings</h3>
                            <p class="user-dropdown-description">Edit defaults, keybinds, and more.</p>
                        </div>
                    </a>
                    `
                );
            }
        },
        100
    );
}
