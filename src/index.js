import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var EXAMPLE_USER = {userid: 1, username: "lala"};

ReactDOM.render(
    <App cells={[]} user={EXAMPLE_USER} />,
  document.getElementById('root')
);
