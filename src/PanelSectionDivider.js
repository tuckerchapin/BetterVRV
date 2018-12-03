import React, { Component } from 'react';

import './styles/PanelSectionDivider.css';

class PanelSectionDivider extends Component {
    render() {
        return (
            <div className="panel-divider">
                {this.props.title}
            </div>
        );
    }
}

export default PanelSectionDivider;
