Parse.serverURL = 'https://parseapi.back4app.com'; // server
Parse.initialize(
  'CfnxYFbrcy0Eh517CcjOAlrAOH9hfe7dpOqfMcJj', // app id
  'Ke0lTaWiPPvLmpDOLLrukkbdAq34GTxVIEh4wcAU' // js key
);

const Timestamps = Parse.Object.extend('Timestamps');
const Series = Parse.Object.extend('Series');
const Flags = Parse.Object.extend('Flags');

const dateIncrement = 1

function getTotalEpisodeCount(callback) {
    let totalTimestampsQuery = new Parse.Query(Timestamps);
    totalTimestampsQuery.exists("episodeId");
    totalTimestampsQuery.count().then((count) => callback(count));
}

function getTotalSeriesCount(callback) {
    let totalSeriesQuery = new Parse.Query(Series);
    totalSeriesQuery.exists("seriesId");
    totalSeriesQuery.count().then((count) => callback(count));
}

function getCompletedEpisodeCount(callback) {
    let hasIntro = new Parse.Query(Timestamps);
        hasIntro.equalTo("hasIntro", true);
        hasIntro.exists("introStart");
        hasIntro.exists("introEnd");
    let noIntro = new Parse.Query(Timestamps);
        noIntro.equalTo("hasIntro", false);
    let completeIntro = Parse.Query.or(hasIntro, noIntro);

    let hasOutro = new Parse.Query(Timestamps);
        hasOutro.equalTo("hasOutro", true);
        hasOutro.exists("outroStart");
        hasOutro.exists("outroEnd");
    let noOutro = new Parse.Query(Timestamps);
        noOutro.equalTo("hasOutro", false);
    let completeOutro = Parse.Query.or(hasOutro, noOutro);

    let hasPostScene = new Parse.Query(Timestamps);
        hasPostScene.equalTo("hasPostScene", true);
        hasPostScene.exists("postSceneStart");
        hasPostScene.exists("postSceneEnd");
    let noPostScene = new Parse.Query(Timestamps);
        noPostScene.equalTo("hasPostScene", false);
    let completePostScene = Parse.Query.or(hasPostScene, noPostScene);

    let hasPreview = new Parse.Query(Timestamps);
        hasPreview.equalTo("hasPreview", true);
        hasPreview.exists("previewStart");
        hasPreview.exists("previewEnd");
    let noPreview = new Parse.Query(Timestamps);
        noPreview.equalTo("hasPreview", false);
    let completePreview = Parse.Query.or(hasPreview, noPreview);

    Parse.Query.and(
            completeIntro,
            completeOutro,
            completePostScene,
            completePreview
        )
        .count()
        .then((count) => callback(count));
}

function getRecentAnnotations(limit, callback) {
    let recentAnnotationsQuery = new Parse.Query(Timestamps);
    recentAnnotationsQuery.exists("episodeTitle");
    recentAnnotationsQuery.include("series");
    recentAnnotationsQuery.descending("updatedAt");
    recentAnnotationsQuery.limit(limit);
    recentAnnotationsQuery.find().then((results) => callback(results));
}

function getTotalEpisodeCountByWeek(numWeeks, callback) {
    let data = new Array(numWeeks);
    let beforeDate = new Date();
    for (let i = numWeeks - 1; i >= 0; i--) {
        let totalTimestampsQuery = new Parse.Query(Timestamps);
        totalTimestampsQuery.exists("episodeId");
        totalTimestampsQuery.lessThanOrEqualTo("createdAt", beforeDate);
        totalTimestampsQuery.count().then(
            (count) => {
                data[i] = count;
                if (checkArrayFullOfCounts(data)) {
                    callback(data);
                }
            }
        );

        beforeDate = new Date(beforeDate.getFullYear(), beforeDate.getMonth(), beforeDate.getDate() - dateIncrement);
    }
}

function getTotalSeriesCountByWeek(numWeeks, callback) {
    let data = new Array(numWeeks);
    let beforeDate = new Date();
    for (let i = numWeeks - 1; i >= 0; i--) {
        let totalSeriesQuery = new Parse.Query(Series);
        totalSeriesQuery.exists("seriesId");
        totalSeriesQuery.lessThanOrEqualTo("createdAt", beforeDate);
        totalSeriesQuery.count().then(
            (count) => {
                data[i] = count;
                if (checkArrayFullOfCounts(data)) {
                    callback(data);
                }
            }
        );

        beforeDate = new Date(beforeDate.getFullYear(), beforeDate.getMonth(), beforeDate.getDate() - dateIncrement);
    }
}

function getCompletedEpisodeCountByWeek(numWeeks, callback) {
    let data = new Array(numWeeks);
    let beforeDate = new Date();
    for (let i = numWeeks - 1; i >= 0; i--) {
        let beforeTimeQuery = new Parse.Query(Timestamps);
            beforeTimeQuery.lessThanOrEqualTo("createdAt", beforeDate);

        let hasIntro = new Parse.Query(Timestamps);
            hasIntro.equalTo("hasIntro", true);
            hasIntro.exists("introStart");
            hasIntro.exists("introEnd");
        let noIntro = new Parse.Query(Timestamps);
            noIntro.equalTo("hasIntro", false);
        let completeIntro = Parse.Query.or(hasIntro, noIntro);

        let hasOutro = new Parse.Query(Timestamps);
            hasOutro.equalTo("hasOutro", true);
            hasOutro.exists("outroStart");
            hasOutro.exists("outroEnd");
        let noOutro = new Parse.Query(Timestamps);
            noOutro.equalTo("hasOutro", false);
        let completeOutro = Parse.Query.or(hasOutro, noOutro);

        let hasPostScene = new Parse.Query(Timestamps);
            hasPostScene.equalTo("hasPostScene", true);
            hasPostScene.exists("postSceneStart");
            hasPostScene.exists("postSceneEnd");
        let noPostScene = new Parse.Query(Timestamps);
            noPostScene.equalTo("hasPostScene", false);
        let completePostScene = Parse.Query.or(hasPostScene, noPostScene);

        let hasPreview = new Parse.Query(Timestamps);
            hasPreview.equalTo("hasPreview", true);
            hasPreview.exists("previewStart");
            hasPreview.exists("previewEnd");
        let noPreview = new Parse.Query(Timestamps);
            noPreview.equalTo("hasPreview", false);
        let completePreview = Parse.Query.or(hasPreview, noPreview);

        Parse.Query.and(
                beforeTimeQuery,
                completeIntro,
                completeOutro,
                completePostScene,
                completePreview
            )
            .count()
            .then(
                (count) => {
                    data[i] = count;
                    if (checkArrayFullOfCounts(data)) {
                        callback(data);
                    }
                }
            );

        beforeDate = new Date(beforeDate.getFullYear(), beforeDate.getMonth(), beforeDate.getDate() - dateIncrement);
    }
}

function checkArrayFullOfCounts(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
            return false;
        }
    }
    return true;
}
