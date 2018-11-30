console.log("hello");

// console.log(document.querySelector("video#player_html5_api"));
// document.querySelector("video#player_html5_api").playbackRate = 3;

// window.onload = () => {
//     // initializeNow(window.document)
//     console.log(1);
//     console.log(document.querySelector("video#player_html5_api"));
//     console.log(document.getElementsByTagName("video"));
// };
//
// if (document) {
//     if (document.readyState === "complete") {
//         // initializeNow(document);
//         console.log(2);
//     } else {
//         document.onreadystatechange = () => {
//             if (document.readyState === "complete") {
//                 // initializeNow(document);
//                 console.log(3);
//                 console.log(document.querySelector("video#player_html5_api"));
//                 console.log(document.getElementsByTagName("video"));
//             } else {
//                 console.log(4);
//             }
//         }
//     }
// } else {
//     console.log(5);
// }
console.log(document.querySelector("iframe.video-player").contentWindow.document.querySelector("video#player_html5_api"));
