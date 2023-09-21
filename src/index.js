import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';import Parse from 'parse';

Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY");
Parse.serverURL = 'https://parseapi.back4app.com/';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
