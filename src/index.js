/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import Options from './Options';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Options />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
