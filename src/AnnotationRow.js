/*global chrome*/
import React, { Component } from 'react';

import './styles/AnnotationRow.css';

class AnnotationRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayStart: "",
            displayEnd: "",
        }
    }

    renderDNE() {
        return "We don't know anything about this episode's " + this.props.label;
    }

    renderNone() {
        return "This episode doesn't have an " + this.props.label;
    }

    renderAnnotations() {
        return `This episode has an ${this.props.label} that starts at ${this.props.starts} and ends at ${this.props.ends}`;
    }

    render() {
        let contents;

        if (this.props.has === undefined) {
            contents = this.renderDNE();
        } else {
            if (this.props.has) {
                contents = this.renderAnnotations();
            } else {
                contents = this.renderNone();
            }
        }

        return (
            <div class="annotation-row-container">
                {contents}
            </div>
        );
    }
}

export default AnnotationRow;
