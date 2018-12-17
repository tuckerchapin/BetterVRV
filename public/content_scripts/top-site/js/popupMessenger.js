chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.target === "top-site") {
            if (request.get === "info") {

                let seriesInfo = document.querySelector("a.episode-info");
                let seriesId = seriesInfo.getAttribute("href").split("/")[2];
                let seriesTitle = seriesInfo.querySelector("span.series").textContent;
                let seasonNumber = parseInt(seriesInfo.querySelector("span.season").innerText.split(" ")[1]);

                let episodeInfo = document.querySelector("h2.title").innerText;
                    let dashDivider = " - ";
                    let dashDividerIndex = episodeInfo.indexOf(dashDivider);
                let episodeTitle = episodeInfo.substring(dashDividerIndex + dashDivider.length);
                let episodeNumber = parseInt(episodeInfo.substring(1, dashDividerIndex));

                let episodeId = window.location.href.split("/")[4];

                sendResponse({
                    seasonNumber,
                    episodeNumber,
                    episodeTitle,
                    seriesTitle,
                    seriesId,
                    episodeId,
                });
            }
        }
    }
);
