let vjsObject = videojs("player_html5_api");

window.addEventListener("message", function(event) {
  if (event.data.type && (event.data.type == "BETTERVRV")) {
      console.log(event.data.content);
  }
}, false);

// window.postMessage(
//   {
//       type: "BETTERVRV",
//       content: "content"
//   },
//   "*"
// );
