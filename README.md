<img alt="logo" src="./public/images/logotype_dark.png">

<a href="https://chrome.google.com/webstore/detail/bettervrv/dhghipbelapdpgpdfmkebjnnokhpeock" target="_blank">
<img align="right" alt="Install BetterVRV" src="./dev/ChromeWebstoreBadge2x.png">
</a>

Features
---
- Hide potential spoilers in the thumbnails and descriptions
- Control the playback speed
- Better control from the keyboard:
    - Seek with the keyboard
    - Adjust the volume and mute/unmute
    - Adjust the playback speed
    - Custom keybindings and increments for total control
- Skip intros and auto-play the next episode when the outro/ending starts
- Reorganize the home page of VRV to be more relevant to you; bringing the "Continue Watching" section right to the top
- ...and many other minor changes to make the VRV experience better

Timestamps and Auto-skipping
---
This extension relies on our users submitting timestamps for when intros/outros/etc. start and end so that other users can skip around these. Please consider reading the [annotation guidelines](https://github.com/tuckerchapin/BetterVRV/wiki/Annotation-Guidelines) and helping out by clicking on the BetterVRV icon in your Chrome taskbar to add annotations when you're watching an episode. It only takes a moment and makes everyone else's experience that much better.

Known Issues
---
- Content blockers like uBlock Origin and AdBlock can cause issues with some of this extensions scripts from running properly. This is being investigated, but for the time being consider disabling these on `https://vrv.co/*`
- The pre-loading posters for episodes are not properly blocked.

Roadmap
---
- [ ] Firefox/Safari support
- [ ] Add "add to/remove from watchlist" icons to series and movie cards on the front page and watchlist pages
- [ ] Subtitle settings
- [ ] Force HD
- [ ] Mark episodes as recap episodes with no new content and skip them
- [ ] Prevent the loading status from blocking the UI
- [ ] Option to include or exclude the title card (if any) from the skip intro settings
- [ ] Add section indicators to the progress bar for intros/outros/etc.
- [ ] Option to play openings and endings all the way through when they are new/different for the series or the first time they appear
- [ ] Per-show settings
- [ ] Ask users if they are willing to have their skipping/pausing habits shared anonymously to try to glean skip sections without manual annotations
