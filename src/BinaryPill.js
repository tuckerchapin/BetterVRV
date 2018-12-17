/*global chrome*/
import React, { Component } from 'react';

import './styles/BinaryPill.css';

class BinaryPill extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pill-container">
                <div className="pill-option" onClick={() => this.props.onChoice(this.props.left)}>
                    {this.props.left}
                </div>
                <div className="pill-option" onClick={() => this.props.onChoice(this.props.right)}>
                    {this.props.right}
                </div>
            </div>
        );
    }
}

export default BinaryPill;
