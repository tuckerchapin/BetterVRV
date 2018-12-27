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
    7,
    (results) => {
        let recentAnnotationsEl = document.getElementById("recent-annotations-container");
        for (let i = 0; i < results.length; i++) {
            let text = `<div class="recent-annotation">`;
            text += results[i].get("episodeTitle");
            text += `<span class="series-info">&nbsp;`;
            text += results[i].get("series").get("seriesTitle");
            text += `&nbsp;S${results[i].get("seasonNumber")}E${results[i].get("episodeNumber")}`;
            text += `</span>`;
            text += `</div>`;
            recentAnnotationsEl.innerHTML += text;
        }
    }
);
