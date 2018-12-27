getTotalEpisodeCount(
    (count) => {
        document.getElementById("total-series-count").textContent = count;
    }
);

getTotalSeriesCount(
    (count) => {
        document.getElementById("total-episode-count").textContent = count;
    }
);

getCompletedEpisodeCount(
    (count) => {
        document.getElementById("complete-episode-count").textContent = count;
    }
);

getRecentAnnotations(
    (results) => {
        let recentAnnotationsEl = document.getElementById("recent-annotations");
        for (let i = 0; i < results.length; i++) {
            let text = `${results[i].get("episodeTitle")} - ${results[i].get("series").get("seriesTitle")} S${results[i].get("seasonNumber")}E${results[i].get("episodeNumber")}`;
            recentAnnotationsEl.innerHTML += text + "<br/>"
        }
    }
);
