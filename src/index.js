import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import Options from './Options';
import Popup from './Popup';
import * as serviceWorker from './serviceWorker';

if (window.location.search.indexOf("popup=true") !== -1) {
    ReactDOM.render(<Popup />, document.getElementById('root'));
} else {
    ReactDOM.render(<Options />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
