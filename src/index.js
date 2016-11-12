import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Dropdown from './Dropdown';
import User from './User';
import Editor from './Editor';
import './index.css';


ReactDOM.render(
  <div> 
    <App /> 
    <Dropdown /> 
    <User name = "Nitin" pic="./head.jpeg" />
    <Editor />
  </div>,
  document.getElementById('root')
);
