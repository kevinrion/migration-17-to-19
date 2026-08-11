import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

var rootEl = document.getElementById('root');

if (!rootEl) {
  console.error('root element missing!!');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootEl
);
