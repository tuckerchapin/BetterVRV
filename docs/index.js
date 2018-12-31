document.addEventListener(
    "DOMContentLoaded",
    () => {
        if (location.hash === "#stats") {
            showChart();
        }
    }
);

getTotalEpisodeCount(
    (count) => {
        document.getElementById("total-episode-count").textContent = count;
    }
);

getTotalSeriesCount(
    (count) => {
        document.getElementById("total-series-count").textContent = count;
    }
);

getCompletedEpisodeCount(
    (count) => {
        document.getElementById("complete-episode-count").textContent = count;
    }
);

getRecentAnnotations(
    12,
    (results) => {
        let recentAnnotationsEl = document.getElementById("recent-annotations");
        for (let i = 0; i < results.length; i++) {
            let text = `<div class="recent-annotation">`;
            text += results[i].get("episodeTitle");
            text += `<span class="series-info">&nbsp;`;
            text += results[i].get("series").get("seriesTitle");
            text += `&nbsp;S${results[i].get("seasonNumber")}E${results[i].get("episodeNumber")}`;
            text += `</span>`;
            text += `</div>`;
            recentAnnotationsEl.innerHTML += text;

            document.getElementById("vrv-loading-spinner").classList.add("hidden");
            document.getElementById("recent-annotations-gradient-overlay").classList.remove("hidden");
            recentAnnotationsEl.classList.remove("hidden");
        }
    }
);

function showChart() {
    document.getElementById("stats-container").classList.add("hidden");
    document.getElementById("recent-annotations-container").classList.add("hidden");
    document.getElementById("chart-container").classList.remove("hidden");
    document.getElementById("chart-toggle").classList.toggle("shown");
}

function toggleShowChart() {
    document.getElementById("stats-container").classList.toggle("hidden");
    document.getElementById("recent-annotations-container").classList.toggle("hidden");
    document.getElementById("chart-container").classList.toggle("hidden");
    document.getElementById("chart-toggle").classList.toggle("shown");

    if (location.hash === "#stats") {
        location.hash = "";
    } else {
        location.hash = "#stats";
    }
}
