chrome.storage.sync.get(
    DEFAULT_OPTIONS,
    (options) => {
        if (options.hideDescriptions) {
            insertCSS("content_scripts/top-site/css/hideDescriptions.css");
        }

        if (options.hideThumbnails) {
            insertCSS("content_scripts/top-site/css/hideThumbnails.css");
        }

        if (options.showWatchedThumbnails) {
            insertCSS("content_scripts/top-site/css/showWatchedThumbnails.css");
        }

        addSettingsDropdown();
    }
);

function addSettingsDropdown() {
    checkExist = setInterval(
        () => {
            let dropdownItems = document.getElementsByClassName("erc-user-dropdown-item");

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
                        <img
                            class="bvrv-dropdown-icon user-dropdown-icon" src=${chrome.extension.getURL("images/vrv_dropdown.svg")}
                        />
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
