Parse.serverURL = 'https://parseapi.back4app.com'; // server
Parse.initialize(
  'CfnxYFbrcy0Eh517CcjOAlrAOH9hfe7dpOqfMcJj', // app id
  'Ke0lTaWiPPvLmpDOLLrukkbdAq34GTxVIEh4wcAU' // js key
);
const Timestamps = Parse.Object.extend('Timestamps');
const Series = Parse.Object.extend('Series');
const Flags = Parse.Object.extend('Flags');


let timestampsQuery = new Parse.Query(Timestamps);
timestampsQuery.exists("episodeId");
timestampsQuery.count().then((count) => console.log(`Your community has added annotations for ${count} episodes`));

let seriesQuery = new Parse.Query(Series);
seriesQuery.exists("seriesId");
seriesQuery.count().then((count) => console.log(`across ${count} series.`));
