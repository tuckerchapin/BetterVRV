/*global chrome*/
import React, { Component } from 'react';

import ControlPanel from "./ControlPanel";
import ControlRow from "./ControlRow";
import KeyBindRow from "./KeyBindRow";

import './styles/Options.css';

const DEFAULT_OPTIONS = {
    "hideDescriptions": true,
    "hideThumbnails": true,
    "showWatchedThumbnails": false,

    "majorSeekIncrement": 10,
    "minorSeekIncrement": 5,

    "majorSeekForward": ["16+76", ""],
    "majorSeekBackward": ["16+74", ""],
    "minorSeekForward": ["39", "76"],
    "minorSeekBackward": ["37", "74"],
    "playPause": ["32", "75"],
    "pause": ["80", ""],
    "toggleFullscreen": ["70", ""],
}

class Options extends Component {
    constructor(props) {
        super(props);

        this.state = DEFAULT_OPTIONS;

        this.load();
    }

    load() {
        chrome.storage.sync.get(
            DEFAULT_OPTIONS,
            (response) => this.setState(response)
        );
    }

    save(newState) {
        this.setState(
            newState,
            () => {
                chrome.storage.sync.set(
                    this.state,
                    () => {if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);}
                );
            }
        )
    }

    resetSettings() {
        if (window.confirm('Are you sure you want to return all settings to their defaults?')) {
            chrome.storage.sync.clear(() => this.load());
        }
    }

    render() {
        return (
            <div>

                <div id="header">
                    <img id="logo" src="../images/logotype.png" alt="logo"/>
                </div>

                <div id="container">

                    <div className="section-title">Settings</div>

                    <ControlPanel title="Spoilers">
                            <ControlRow title="Hide Thumbnails"
                                description="All thumbnails will be blurred. The placeholder image used by the player while loading the episode will also be blurred."
                                controlType="toggle"
                                value={this.state.hideThumbnails}
                                onChange={(newValue) => this.save({hideThumbnails: newValue})}
                            />
                                <ControlRow title="Show Watched Thumbnails"
                                    description="Thumbnails on episodes you've already watched will not be blurred."
                                    controlType="toggle"
                                    value={this.state.showWatchedThumbnails}
                                    disabled={!this.state.hideThumbnails}
                                    subrow={true}
                                    onChange={(newValue) => this.save({showWatchedThumbnails: newValue})}
                                />
                            <ControlRow title="Hide Descriptions"
                                description="All episode descriptions will be hidden."
                                controlType="toggle"
                                value={this.state.hideDescriptions}
                                onChange={(newValue) => this.save({hideDescriptions: newValue})}
                            />
                    </ControlPanel>

                    <ControlPanel title="Tuning">
                        <ControlRow title="Major Seek Increment"
                            description="How far forward/backward the major seek shortcuts will skip."
                            controlType="number"
                            value={this.state.majorSeekIncrement}
                            onChange={(newValue) => this.save({majorSeekIncrement: newValue})}
                        />
                        <ControlRow title="Minor Seek Increment"
                            description="How far forward/backward the minor seek shortcuts will skip."
                            controlType="number"
                            value={this.state.minorSeekIncrement}
                            onChange={(newValue) => this.save({minorSeekIncrement: newValue})}
                        />
                    </ControlPanel>

                    <ControlPanel title="Key Bindings">
                        <KeyBindRow
                            title="Toggle Fullscreen"
                            value={this.state.toggleFullscreen}
                            alreadyBoundKeys={this.state}
                            selfBoundKey={"toggleFullscreen"}
                            onChange={(newValue) => this.save({toggleFullscreen: newValue})}
                        />
                        <KeyBindRow
                            title="Toggle Play/Pause"
                            value={this.state.playPause}
                            alreadyBoundKeys={this.state}
                            selfBoundKey={"playPause"}
                            onChange={(newValue) => this.save({playPause: newValue})}
                        />
                            <KeyBindRow
                                title="Pause"
                                value={this.state.pause}
                                alreadyBoundKeys={this.state}
                                selfBoundKey={"pause"}
                                subrow={true}
                                onChange={(newValue) => this.save({pause: newValue})}
                            />
                        <KeyBindRow
                            title="Seek Forward - Major"
                            value={this.state.majorSeekForward}
                            alreadyBoundKeys={this.state}
                            selfBoundKey={"majorSeekForward"}
                            onChange={(newValue) => this.save({majorSeekForward: newValue})}
                        />
                            <KeyBindRow
                                title="Seek Forward - Minor"
                                value={this.state.minorSeekForward}
                                alreadyBoundKeys={this.state}
                                selfBoundKey={"minorSeekForward"}
                                subrow={true}
                                onChange={(newValue) => this.save({minorSeekForward: newValue})}
                            />
                        <KeyBindRow
                            title="Seek Backward - Major"
                            value={this.state.majorSeekBackward}
                            alreadyBoundKeys={this.state}
                            selfBoundKey={"majorSeekBackward"}
                            onChange={(newValue) => this.save({majorSeekBackward: newValue})}
                        />
                            <KeyBindRow
                                title="Seek Backward - Minor"
                                value={this.state.minorSeekBackward}
                                alreadyBoundKeys={this.state}
                                selfBoundKey={"minorSeekBackward"}
                                subrow={true}
                                onChange={(newValue) => this.save({minorSeekBackward: newValue})}
                            />
                    </ControlPanel>

                    <div id="reset-container">
                        <div id="reset-button" onClick={() => this.resetSettings()}>
                            reset all settings to defaults
                        </div>
                    </div>

                    <div id="reset-container">
                        <div id="reset-button" onClick={() => chrome.storage.sync.get(null, (data) => console.log(JSON.stringify(data)))}>
                            get settings
                        </div>
                    </div>

                </div>

                <div id="footer">
                    <div className="footer-entry">
                        Issues? Suggestions? Complaints? <a href="mailto:tuckerchapin@gmail.com">Let me know.</a>
                    </div>
                    <div className="footer-entry">
                        <a href="https://github.com/tuckerchapin/BetterVRV/issues">Github.</a>
                    </div>
                    <div className="footer-entry">
                        Consider <a href="https://venmo.com/tuckerchapin">donating.</a>
                    </div>
                    <div id="disclaimer">
                        VRV, CrunchyRoll, and all other trademarks, service marks, trade names, product names and logos appearing on this site are the property of their respective owners.
                    </div>
                </div>

            </div>
        );
    }
}

export default Options;
