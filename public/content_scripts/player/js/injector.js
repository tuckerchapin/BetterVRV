insertJS("content_scripts/player/js/injected.js");

var port = chrome.runtime.connect();

// window.addEventListener("message", function(event) {
//   if (event.data.type && (event.data.type == "BETTERVRV")) {
//       console.log(event.content);
//   }
// }, false);

window.postMessage(
  {
      type: "BETTERVRV",
      content: "content"
  },
  "*"
);
