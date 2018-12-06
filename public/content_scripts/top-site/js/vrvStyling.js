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
        reorderFrontPage();
    }
);

function reorderFrontPage() {
    let vrvHomepage = document.querySelector("div.vrv-homepage");
    if (vrvHomepage) {
        insertCSS("content_scripts/top-site/css/reorderFrontpage.css");
        checkExist = setInterval(
            () => {
                let continueWatching = document.querySelector("div#continue_watching");
                let watchlist = document.querySelector("div#watchlist_122");
                let recommendations = document.querySelector("div#recommendations");

                if (continueWatching && watchlist && recommendations) {
                    clearInterval(checkExist);

                    let feedContainer = document.querySelector("div.erc-feed-container");
                    feedContainer.insertBefore(recommendations, feedContainer.firstChild);
                    feedContainer.insertBefore(watchlist, feedContainer.firstChild);
                    feedContainer.insertBefore(continueWatching, feedContainer.firstChild);
                }
            },
            100
        );
    }
}

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
