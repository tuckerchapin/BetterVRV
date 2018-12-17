import React, { Component } from 'react';

import './styles/VRVLoadingSpinner.css';

class VRVLoadingSpinner extends Component {
    render() {
        return (
            <div class="vrv-loading-spinner">
                <svg id="vrvWebSpinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50 10.39 84.3 30.2 84.3 30.2 93.3 25 50 0 50 10.39"></polygon><polygon points="84.3 30.2 84.3 69.8 84.3 69.8 93.3 75 93.3 25 84.3 30.2"></polygon><polygon points="50 89.61 50 100 93.3 75 84.3 69.8 50 89.61"></polygon><polygon points="15.7 69.8 6.7 75 50 100 50 89.61 15.7 69.8"></polygon><polygon points="15.7 69.8 15.7 30.2 6.7 25 6.7 75 15.7 69.8 15.7 69.8"></polygon><polygon points="15.7 30.2 50 10.39 50 0 6.7 25 15.7 30.2 15.7 30.2"></polygon></svg>
            </div>
        );
    }
}

export default VRVLoadingSpinner;
