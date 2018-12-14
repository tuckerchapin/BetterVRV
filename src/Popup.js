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

        this.state = {
            loading: true,

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
                    (response) => this.setState(response, () => this.loadParseData())
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

        flag.save();
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
