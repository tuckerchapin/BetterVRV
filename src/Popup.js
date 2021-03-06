/*global chrome*/
import React, { Component } from 'react';
import Parse from 'parse';

import VRVLoadingSpinner from './VRVLoadingSpinner';
import AnnotationRow from './AnnotationRow';

import './styles/Popup.css';

class Popup extends Component {
    constructor(props) {
        super(props);

        Parse.serverURL = 'https://parseapi.back4app.com'; // server
        Parse.initialize(
          'CfnxYFbrcy0Eh517CcjOAlrAOH9hfe7dpOqfMcJj', // app id
          'Ke0lTaWiPPvLmpDOLLrukkbdAq34GTxVIEh4wcAU' // js key
        );

        this.timestamp = {};

        this.missingTimeAnnotations = [
            // "hasIntro",
            // "hasOutro",
            // "hasPreview",
            // "hasPostScene",
            "introStart",
            "introEnd",
            "outroStart",
            "outroEnd",
            "previewStart",
            "previewEnd",
            "postSceneStart",
            "postSceneEnd",
        ];

        this.annotationDisplayTypes = {
            introStart: "Intro starts",
            introEnd: "Intro ends",
            outroStart: "Outro starts",
            outroEnd: "Outro ends",
            previewStart: "Preview starts",
            previewEnd: "Preview ends",
            postSceneStart: "Post-outro starts",
            postSceneEnd: "Post-outro ends",
            intro: "Intro",
            outro: "Outro",
            preview: "Preview",
            postScene: "Post-outro",
        }

        this.state = {
            loading: true,
            isCreatingAnnotation: false,
            annotationValid: false,
            // annotationType,

            // currentTime,
            // duration,

            // seasonNumber,
            // episodeNumber,
            // episodeTitle,
            // seriesTitle,
            // seriesId,
            // episodeId,

            // hasIntro,
            // hasOutro,
            // hasPreview,
            // hasPostScene,
            // introStart,
            // introEnd,
            // outroStart,
            // outroEnd,
            // previewStart,
            // previewEnd,
            // postSceneStart,
            // postSceneEnd,
        };

        this.getTabInfo();
    }

    getTabInfo() {
        chrome.tabs.query(
            {active: true, currentWindow: true},
            (tabs) => {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                        target: "top-site",
                        get: "info",
                    },
                    (response) => {
                        if (response !== undefined) {
                            this.setState(response, () => this.loadParseData());
                        } else {
                            this.getTabInfo();
                        }
                    }
                );
            }
        );
    }

    getCurrentPlayerInfo() {
        chrome.tabs.query(
            {active: true, currentWindow: true},
            (tabs) => {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                        target: "player",
                        get: "currentInfo",
                    },
                    (response) => this.setState(response)
                );
            }
        );
    }

    saveData(newData) {
        this.timestamp.set(newData);
        this.timestamp.save().then(
            (result) => {
                this.setState(newData);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    loadParseData() {
        const Timestamps = Parse.Object.extend('Timestamps');
        const query = new Parse.Query(Timestamps);
        query.equalTo("episodeId", this.state.episodeId);
        query.first().then(
            (result) => {
                if (result) {
                    this.timestamp = result;

                    this.setState({
                        loading: false,

                        hasIntro: result.get("hasIntro"),
                        hasOutro: result.get("hasOutro"),
                        hasPreview: result.get("hasPreview"),
                        hasPostScene: result.get("hasPostScene"),
                        introStart: result.get("introStart"),
                        introEnd: result.get("introEnd"),
                        outroStart: result.get("outroStart"),
                        outroEnd: result.get("outroEnd"),
                        previewStart: result.get("previewStart"),
                        previewEnd: result.get("previewEnd"),
                        postSceneStart: result.get("postSceneStart"),
                        postSceneEnd: result.get("postSceneEnd"),
                    });
                } else {
                    this.timestamp = new Timestamps();

                    this.timestamp.set({
                        episodeId: this.state.episodeId,
                        episodeTitle: this.state.episodeTitle,
                        seasonNumber: this.state.seasonNumber,
                        episodeNumber: this.state.episodeNumber
                    });

                    this.timestamp.save().then(
                        (result) => {
                            this.setState({loading: false});

                            const Series = Parse.Object.extend('Series');
                            const query = new Parse.Query(Series);
                            query.equalTo("seriesId", this.state.seriesId);
                            query.first().then(
                                (result) => {
                                    if (result) {
                                        this.timestamp.set("series", result);
                                        this.timestamp.save();
                                    } else {
                                        let newSeries = new Series();
                                        newSeries.set("seriesId", this.state.seriesId)
                                        newSeries.set("seriesTitle", this.state.seriesTitle);
                                        newSeries.save().then(
                                            (result) => {
                                                this.timestamp.set("series", newSeries);
                                                this.timestamp.save();
                                            },
                                            (error) => {
                                                console.error(error);
                                            }
                                        );
                                    }
                                },
                                (error) => {
                                    console.error(error);
                                }
                            );
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    flag(value) {
        const Flags = Parse.Object.extend("Flags");
        const flag = new Flags();

        flag.set("episode", this.timestamp);
        flag.set("attribute", value);

        if (window.confirm(`Would you like to flag that there is something wrong with this episode's ${this.annotationDisplayTypes[value].toLowerCase()} annotation?`)) {
            flag.save();
        }
    }

    checkAnnotationValidity(annotation) {
        if ((this.state.currentTime >= 0) && (this.state.currentTime <= this.state.duration)) {
            if (annotation.indexOf("Start") !== -1) {
                let correspondingTimestamp = annotation.slice(0, -5) + "End";
                if (
                    (this.state[correspondingTimestamp] === undefined) ||
                    (this.state.currentTime < this.state[correspondingTimestamp])
                ) {
                    this.setState({annotationValid: true, annotationType: annotation});
                    return true;
                }
            } else if (annotation.indexOf("End") !== -1) {
                let correspondingTimestamp = annotation.slice(0, -3) + "Start";
                if (
                    (this.state[correspondingTimestamp] === undefined) ||
                    (this.state.currentTime > this.state[correspondingTimestamp])
                ) {
                    this.setState({annotationValid: true, annotationType: annotation});
                    return true;
                }
            }
        }

        this.setState({annotationValid: false});
        return false;
    }

    nudgeTimeUp() {
        let ceil = Math.ceil(this.state.currentTime);
        let add1 = this.state.currentTime + 1;

        if (ceil === this.state.currentTime) {
            if (add1 <= this.state.duration) {
                this.setState({currentTime: this.state.currentTime + 1});
            }
        } else {
            if (ceil <= this.state.duration) {
                this.setState({currentTime: ceil});
            }
        }
    }

    nudgeTimeDown() {
        let floor = Math.floor(this.state.currentTime);
        let minus1 = this.state.currentTime - 1;

        if (floor === this.state.currentTime) {
            if (minus1 >= 0) {
                this.setState({currentTime: this.state.currentTime - 1});
            }
        } else {
            if (floor >= 0) {
                this.setState({currentTime: floor});
            }
        }
    }

    submitAnnotation() {
        if (this.checkAnnotationValidity(this.state.annotationType)) {
            let correspondingHas = "has" + this.state.annotationType.charAt(0).toUpperCase();
            if (this.state.annotationType.indexOf("End") !== -1) {
                correspondingHas += this.state.annotationType.slice(1, -3);
            } else if (this.state.annotationType.indexOf("Start") !== -1) {
                correspondingHas += this.state.annotationType.slice(1, -5);
            }

            let annotationData ={}
            annotationData[this.state.annotationType] = this.state.currentTime;
            annotationData[correspondingHas] = true;

            this.setState({isCreatingAnnotation: false}, () => this.saveData(annotationData));
        } else {
            alert("This timestamp doesn't seem to be valid!\n\nCheck that you selected the right event and that it is after/before the corresponding start/end timestamps.");
        }
    }

    formatSecondsForDisplay(timeInSeconds) {
        if (timeInSeconds === undefined) {
            return "??:??.??";
        }

        function twoPad(value) {
            let s = String(value);
            if (s.length === 1) {
                return "0" + s;
            }
            return s;
        }

        let hoursPortion = parseInt(timeInSeconds / (60 * 60));
        let minutesPortion = parseInt((timeInSeconds - (hoursPortion * (60 * 60))) / 60);
        let secondsPortion = parseInt((timeInSeconds - (hoursPortion * (60 * 60)) - (minutesPortion * 60)));
        let decimalPortion = parseInt((timeInSeconds % 1) * 100);

        let formattedTime =
            `${twoPad(minutesPortion)}:${twoPad(secondsPortion)}.${twoPad(decimalPortion)}`;

        if (hoursPortion > 0) {
            return String(hoursPortion) + ":" + formattedTime;
        }

        return formattedTime;
    }

    hasMissingAnnotations() {
        // First check that the "hasX" fields have values
        if (
            (this.state.hasIntro !== undefined) &&
            (this.state.hasOutro !== undefined) &&
            (this.state.hasPreview !== undefined) &&
            (this.state.hasPostScene !== undefined)
        ) {
            // If the "hasX" field is false, then that's fine and it doesn't need to have "xStart" and "xEnd"
            // If the "hasX" field is true, then it needs both the "xStart" and "xEnd" attribute to be considered complete
            if (
                (!this.state.hasIntro ||
                    ((this.state.introStart !== undefined) && (this.state.introEnd !== undefined))) &&
                (!this.state.hasOutro ||
                    ((this.state.outroStart !== undefined) && (this.state.outroEnd !== undefined))) &&
                (!this.state.hasPreview ||
                    ((this.state.previewStart !== undefined) && (this.state.previewEnd !== undefined))) &&
                (!this.state.hasPostScene ||
                    ((this.state.postSceneStart !== undefined) && (this.state.postSceneEnd !== undefined)))
            ) {
                // If all of these are the case, then it has no missing annotations.
                return false;
            }

        }

        let newMissingAnnotations = [];

        if (this.state.hasIntro === undefined || this.state.hasIntro) {
            if (this.state.introStart === undefined) {
                newMissingAnnotations.push("introStart")
            }
            if (this.state.introEnd === undefined) {
                newMissingAnnotations.push("introEnd")
            }
        }

        if (this.state.hasOutro === undefined || this.state.hasOutro) {
            if (this.state.outroStart === undefined) {
                newMissingAnnotations.push("outroStart")
            }
            if (this.state.outroEnd === undefined) {
                newMissingAnnotations.push("outroEnd")
            }
        }

        if (this.state.hasPreview === undefined || this.state.hasPreview) {
            if (this.state.previewStart === undefined) {
                newMissingAnnotations.push("previewStart")
            }
            if (this.state.previewEnd === undefined) {
                newMissingAnnotations.push("previewEnd")
            }
        }

        if (this.state.hasPostScene === undefined || this.state.hasPostScene) {
            if (this.state.postSceneStart === undefined) {
                newMissingAnnotations.push("postSceneStart")
            }
            if (this.state.postSceneEnd === undefined) {
                newMissingAnnotations.push("postSceneEnd")
            }
        }

        this.missingTimeAnnotations = newMissingAnnotations;

        // In any other case, it has missing annotations.
        return true;
    }

    flagAnnotationNotice() {
        return (
            <div className="annotations-notice">
                If any of these annotations need editing or are incorrect, please let us know by flagging them with the icon on the right.
            </div>
        );
    }

    missingAnnotationNotice() {
        return (
            <div className="annotations-notice">
                It seems we're missing some annotations for this episode. BetterVRV has to rely on our community for intro/outro/etc. annotations. Please help by annotating this episode.
                <br />
                <br />
                <a
                    id="annotations-notice-link"
                    target="_blank" 
                    href="https://github.com/tuckerchapin/BetterVRV/wiki/Annotation-Guidelines"
                >
                    BetterVRV Annotation Guidelines
                </a>
            </div>
        );
    }

    renderPromptCreateAnnotation() {
        return (
            <div id="add-annotation-container">
                <div
                    className="add-annotation-button"
                    onClick={() => this.setState(
                        {isCreatingAnnotation: true},
                        () => this.getCurrentPlayerInfo()
                    )}
                >
                    Add New Timestamp
                </div>
            </div>
        );
    }

    renderCreatingAnnotation() {
        return (
            <div id="add-annotation-container">
                <div id="add-annotation-information-container">
                    <select
                        id="add-annotation-type-dropdown"
                        onChange={(e) => this.setState({annotationType: e.target.value})}
                    >
                        <option value="" disabled selected hidden>What happens?</option>
                        {this.missingTimeAnnotations.map(annotation => (
                            <option
                                value={annotation}
                                className="add-annotation-type-option"
                            >{this.annotationDisplayTypes[annotation]}</option>
                        ))}
                    </select>
                    <div id="add-annotation-time-display">
                        <div id="add-annotation-time-at">
                            @
                        </div>
                        <div id="annotation-time-nudge-buttons">
                            <div className="annotation-nudge-button" onClick={() => this.nudgeTimeUp()}>+</div>
                            <div className="annotation-nudge-button" onClick={() => this.nudgeTimeDown()}>-</div>
                        </div>
                        <div id="add-annotation-time">
                            {this.formatSecondsForDisplay(this.state.currentTime)}
                        </div>
                        <div id="add-annotation-time-reload" onClick={() => this.getCurrentPlayerInfo()}>
                        	↻
                        </div>
                    </div>
                </div>
                <div id="add-annotation-buttons-container">
                    <div
                        id="cancel-annotation-button"
                        className="add-annotation-button"
                        onClick={() => this.setState({isCreatingAnnotation: false})}
                    >
                        Cancel
                    </div>
                    <div
                        id="submit-annotation-button"
                        className="add-annotation-button"
                        onClick={() => this.submitAnnotation()}
                    >
                        Submit
                    </div>
                </div>
            </div>
        );
    }

    renderLoading() {
        return (
            <div id="loading-spinner-container">
                <div id="loading-spinner">
                    <VRVLoadingSpinner/>
                </div>
            </div>
        );
    }

    renderLoaded() {
        return (
            <div className="popup-container">

                <div id="popup-header">
                    <div id="popup-title-detail-container">
                        <div id="popup-series-title" className="popup-title-detail ellipsis-truncate">
                            {this.state.seriesTitle}
                        </div>
                        <span className="popup-title-detail"> | </span>
                        <div id="popup-episode-numbers" className="popup-title-detail">
                            S{this.state.seasonNumber}E{this.state.episodeNumber}
                        </div>
                    </div>
                    <div id="popup-episode-title" className="ellipsis-truncate">
                        {this.state.episodeTitle}
                    </div>
                </div>

                <div className="popup-divider"></div>

                {this.hasMissingAnnotations() ? this.missingAnnotationNotice() : this.flagAnnotationNotice()}

                <div className="popup-divider"></div>

                <div id="annotations-container">
                    <AnnotationRow
                        label="Intro"
                        has={this.state.hasIntro}
                        start={this.state.introStart}
                        end={this.state.introEnd}
                        onHasUpdate={(newHas) => this.saveData({hasIntro: newHas})}
                        onFlagged={() => this.flag("intro")}
                    />
                    <AnnotationRow
                        label="Outro"
                        has={this.state.hasOutro}
                        start={this.state.outroStart}
                        end={this.state.outroEnd}
                        onHasUpdate={(newHas) => this.saveData({hasOutro: newHas})}
                        onFlagged={() => this.flag("outro")}
                    />
                    <AnnotationRow
                        label="Post-Outro"
                        has={this.state.hasPostScene}
                        start={this.state.postSceneStart}
                        end={this.state.postSceneEnd}
                        onHasUpdate={(newHas) => this.saveData({hasPostScene: newHas})}
                        onFlagged={() => this.flag("postScene")}
                    />
                    <AnnotationRow
                        label="Preview"
                        has={this.state.hasPreview}
                        start={this.state.previewStart}
                        end={this.state.previewEnd}
                        onHasUpdate={(newHas) => this.saveData({hasPreview: newHas})}
                        onFlagged={() => this.flag("preview")}
                    />
                </div>

                <div className="popup-divider"></div>

                {this.hasMissingAnnotations() ? (
                    <div>
                        {this.state.isCreatingAnnotation ?
                            this.renderCreatingAnnotation() : this.renderPromptCreateAnnotation()}
                        <div className="popup-divider"></div>
                    </div>
                ) : null}

                <div id="popup-footer">
                    <img
                        id="popup-header-logo"
                        src="images/icon_noborder.svg"
                        alt="logo"
                        draggable="false"
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div id="match-white-popup-border">
                {this.state.loading ? this.renderLoading() : this.renderLoaded()}
            </div>
        );
    }
}

export default Popup;
