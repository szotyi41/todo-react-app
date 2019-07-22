import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { RequestProvider } from 'react-request-hook';
import axios from 'axios';

import 'selectize/dist/css/selectize.css';
import './FormElements.css';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

ReactDOM.render(  
    <RequestProvider value={axiosInstance}>
        <App />
    </RequestProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
