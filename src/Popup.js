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

        this.Timestamp = {};

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

        chrome.tabs.query(
            {active: true, currentWindow: true},
            (tabs) => {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    {
                        target: "top-site",
                        get: "info",
                    },
                    (response) => this.setState(response, () => this.fetchParseData())
                );
            }
        );
    }

    fetchParseData() {
        const Timestamps = Parse.Object.extend('Timestamps');
        const query = new Parse.Query(Timestamps);
        query.equalTo("episodeId", this.state.episodeId);
        query.first().then(
            (result) => {
                if (result) {
                    this.Timestamp = result;

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
                    this.Timestamp = new Timestamps();

                    this.Timestamp.set('episodeId', this.state.episodeId);
                    this.Timestamp.set('episodeTitle', this.state.episodeTitle);
                    this.Timestamp.set('seasonNumber', this.state.seasonNumber);
                    this.Timestamp.set('episodeNumber', this.state.episodeNumber);

                    this.Timestamp.save().then(
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

    renderMissingAnnotationNotice() {
        return (
            <div>
                <div id="missing-annotations-notice">
                    It seems we're missing some annotations for this episode. BetterVRV has to rely on our community for intro/outro/etc. annotations. Please help by annotating this episode.
                </div>
                <div class="popup-divider"></div>
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
            <div>
                {this.hasMissingAnnotations() ? this.renderMissingAnnotationNotice() : null}
                <div id="annotations-container">
                    <AnnotationRow
                        label="intro"
                        has={this.state.hasIntro}
                        starts={this.state.introStart}
                        ends={this.state.introEnd}
                    />
                    <AnnotationRow
                        label="outro"
                        has={this.state.hasOutro}
                        starts={this.state.outroStart}
                        ends={this.state.outroEnd}
                    />
                    <AnnotationRow
                        label="preview"
                        has={this.state.hasPreview}
                        starts={this.state.previewStart}
                        ends={this.state.previewEnd}
                    />
                    <AnnotationRow
                        label="after-credits scene"
                        has={this.state.hasPostScene}
                        starts={this.state.postSceneStart}
                        ends={this.state.postSceneEnd}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div id="match-white-popup-border">
                <div class="popup-container">

                    <div id="popup-header">
                        <div id="popup-title-detail-container">
                            <div id="popup-series-title" class="popup-title-detail ellipsis-truncate">
                                {this.state.seriesTitle}
                            </div>
                            <span class="popup-title-detail"> | </span>
                            <div id="popup-episode-numbers" class="popup-title-detail">
                                S{this.state.seasonNumber}E{this.state.episodeNumber}
                            </div>
                        </div>
                        <div id="popup-episode-title" class="ellipsis-truncate">
                            {this.state.episodeTitle}
                        </div>
                    </div>

                    <div class="popup-divider"></div>

                    {this.state.loading ? this.renderLoading() : this.renderLoaded()}

                    <div class="popup-divider"></div>

                    <div id="popup-footer">
                        <img
                            id="popup-header-logo"
                            src="images/icon_noborder.svg"
                            alt="logo"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
