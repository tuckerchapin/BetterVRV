/*global chrome*/
import React, { Component } from 'react';

import BinaryPill from './BinaryPill';
import './styles/AnnotationRow.css';

class AnnotationRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            has: this.props.has,
            displayStart: this.formatSecondsForDisplay(this.props.start),
            displayEnd: this.formatSecondsForDisplay(this.props.end),
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            has: this.props.has,
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
        let article = "a";
        if ("aeiou".indexOf(this.props.label.charAt(0)) !== -1) {
            article += "n";
        }

        return (
            <div className="annotation-row-container">
                <div className="annotation-dne-label-container">
                    <div className="annotation-dne-prompt">
                        Does this episode have {article}
                    </div>
                    <div className="annotation-dne-label">
                        {this.props.label}?
                    </div>
                </div>
                <BinaryPill
                    left="yes"
                    right="no"
                    onChoice={(choice) => this.setState({has: (choice === "yes")})}
                />
            </div>
        );
    }

    renderNone() {
        return (
            <div className="annotation-container annotation-none">
                No {this.props.label.toLowerCase()}
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
                    <div className="annotation-time">{this.state.displayEnd}</div>
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
                {(this.state.has === false) ? this.renderNone() : this.renderTimes()}
            </div>
        );
    }

    render() {
        if (this.state.has === undefined) {
            return this.renderDNE();
        } else {
            return this.renderAnnotations();
        }
    }
}

export default AnnotationRow;
