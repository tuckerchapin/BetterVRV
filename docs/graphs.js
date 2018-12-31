let numIncrements = 10;

labels = new Array(numIncrements);
let today = new Date();
for (let i = 0; i < labels.length; i ++) {
    labels[labels.length - 1 - i] = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (i * dateIncrement));
}

let chartCanvas = document.getElementById("chart").getContext('2d');
let graph = new Chart(
    chartCanvas,
    {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Total Series",
                    borderColor: "rgba(47, 45, 66, 1)",//"black",//"rgba(255, 221, 0, 1)",
                    backgroundColor: "rgba(47, 45, 66, .9)",//"black",//"rgba(217, 193, 38, 1)",
                },
                {
                    label: "Complete Annotations",
                    borderColor: "rgba(255, 221, 0, 1)",
                    backgroundColor: "rgba(255, 221, 0, .8)",
                },
                {
                    label: "Total Annotations",
                    borderColor: "rgba(255, 221, 0, 1)",//"rgba(47, 45, 66, 1)",
                    backgroundColor: "rgba(255, 221, 0, .2)",
                },
            ]
        },
        options: {
            legend: {
                reverse: true,
                labels: {
                    fontColor: "#f9f9fa",
                    fontSize: 12,
                    fontWeight: 300,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "#f9f9fa",
                        fontSize: 12,
                        fontWeight: 300,
                        // stepSize: 1,
                        // beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'MMM D'
                        }
                    },
                    ticks: {
                        fontColor: "#f9f9fa",
                        fontSize: 12,
                        fontWeight: 300,
                        // stepSize: 1,
                        // beginAtZero: true
                    }
                }]
            }
        },
    }
);

getTotalEpisodeCountByTime(
    numIncrements,
    (counts) => {
        graph.data.datasets[2].data = counts;
        graph.update();
    }
);

getTotalSeriesCountByTime(
    numIncrements,
    (counts) => {
        graph.data.datasets[0].data = counts;
        graph.update();
    }
);

getCompletedEpisodeCountByTime(
    numIncrements,
    (counts) => {
        graph.data.datasets[1].data = counts;
        graph.update();
    }
);
