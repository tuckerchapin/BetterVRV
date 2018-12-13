/*global chrome*/
import React, { Component } from 'react';
import Parse from 'parse';

import VRVLoadingSpinner from './VRVLoadingSpinner';

import './styles/Popup.css';

class Popup extends Component {
    constructor(props) {
        super(props);

        Parse.serverURL = 'https://parseapi.back4app.com'; // server
        Parse.initialize(
          'CfnxYFbrcy0Eh517CcjOAlrAOH9hfe7dpOqfMcJj', // app id
          'Ke0lTaWiPPvLmpDOLLrukkbdAq34GTxVIEh4wcAU' // js key
        );

        this.state = {
            loading: true,
            vrvContentId: "",
            series: "",
            episode: "",
        };

        chrome.tabs.query(
            {active: true, currentWindow: true},
            (tabs) => {
                let urlChunks = tabs[0].url.split("/");
                let titleChunk = urlChunks[5].split(":");
                this.setState(
                    {
                        vrvContentId: urlChunks[4],
                        series: titleChunk[0].replace(/-/g, ' '),
                        episode: titleChunk[1].replace(/-/g, ' '),
                    },
                    () => this.fetchParseData()
                );
            }
        );
    }

    fetchParseData() {
        const Timestamps = Parse.Object.extend('Timestamps');
        const query = new Parse.Query(Timestamps);
        query.equalTo("vrvContentId", this.state.vrvContentId);
        query.find().then(
            (results) => {
                if (results.length === 0) {
                    this.setState({loading: false, noData: true});
                } else {
                    this.setState({
                        loading: false,
                        isIntro: results[0].get("isIntro"),
                        introStart: results[0].get("introStart"),
                        introEnd: results[0].get("introEnd"),
                        isOutro: results[0].get("isOutro"),
                        outroStart: results[0].get("outroStart"),
                        outroEnd: results[0].get("outroEnd"),
                        isPreview: results[0].get("isPreview"),
                        previewStart: results[0].get("previewStart"),
                        previewEnd: results[0].get("previewEnd"),
                        isPostScene: results[0].get("isPostScene"),
                    });
                }
            },
            (error) => {
                console.error(error);
            }
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
            JSON.stringify(this.state)
        );
    }

    render() {
        return (
            <div id="match-white-popup-border">
                <div class="popup-container">
                    <div id="popup-title">
                        <div id="popup-series-title">{this.state.series}</div>
                        <div id="popup-episode-title">{this.state.episode}</div>
                    </div>
                    <div class="popup-divider"></div>
                    {this.state.loading ? this.renderLoading() : this.renderLoaded()}
                </div>
            </div>
        );
    }
}

export default Popup;
