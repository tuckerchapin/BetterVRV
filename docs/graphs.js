let numWeeks = 10;

let chartCanvas = document.getElementById("chart").getContext('2d');
let graph = new Chart(chartCanvas, {type: 'line'})

getTotalEpisodeCountByWeek(
    numWeeks,
    (counts) => {
        graph.data.labels = Object.keys(counts);
        graph.data.datasets.push({
            label: "Total Annotations",
            data: counts,
        });
        graph.update();

        document.getElementById("vrv-loading-spinner").classList.add("hidden");
        document.getElementById("chart-container").classList.remove("hidden");
    }
);

getTotalSeriesCountByWeek(
    numWeeks,
    (counts) => {
        graph.data.labels = Object.keys(counts);
        graph.data.datasets.push({
            label: "Total Series",
            data: counts,
        });
        graph.update();

        document.getElementById("vrv-loading-spinner").classList.add("hidden");
        document.getElementById("chart-container").classList.remove("hidden");
    }
);

getCompletedEpisodeCountByWeek(
    numWeeks,
    (counts) => {
        graph.data.labels = Object.keys(counts);
        graph.data.datasets.push({
            label: "Complete Annotations",
            data: counts,
        });
        graph.update();

        document.getElementById("vrv-loading-spinner").classList.add("hidden");
        document.getElementById("chart-container").classList.remove("hidden");
    }
);
