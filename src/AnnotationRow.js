/*global chrome*/
import React, { Component } from 'react';

import './styles/AnnotationRow.css';

class AnnotationRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayStart: this.formatSecondsForDisplay(this.props.start),
            displayEnd: this.formatSecondsForDisplay(this.props.end),
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            displayStart: this.formatSecondsForDisplay(this.props.start),
            displayEnd: this.formatSecondsForDisplay(this.props.end),
        });
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
            `${twoPad(minutesPortion)}:${twoPad(secondsPortion)}.${twoPad(parseInt(decimalPortion * 100))}`;

        if (hoursPortion > 0) {
            return String(hoursPortion) + ":" + formattedTime;
        }

        return formattedTime;
    }

    renderDNE() {
        return "We don't know anything about this episode's " + this.props.label;
    }

    renderNone() {
        return (
            <div className="annotation-container">
                <span className="annotation-value">No {this.props.label}</span>
            </div>
        );
    }

    renderTimes() {
        return (
            <div className="annotation-container">
                <div className="annotation-time-container">
                    <div className="annotation-time-detail time-detail-start">starts at</div>
                    <div className="annotation-time">{this.state.displayStart}</div>
                </div>
                <div className="annotation-time-container">
                    <div className="annotation-time-detail time-detail-end">ends at</div>
                    <div className="annotation-value">{this.state.displayEnd}</div>
                </div>
            </div>
        );

    }

    renderAnnotations() {
        return (
            <div className="annotation-row-container">
                <div className="annotation-label">
                    {this.props.label}
                </div>
                {(this.props.has === false) ? this.renderNone() : this.renderTimes()}
            </div>
        );
    }

    render() {
        if (this.props.has === undefined) {
            return this.renderDNE();
        } else {
            return this.renderAnnotations();
        }
    }
}

export default AnnotationRow;
