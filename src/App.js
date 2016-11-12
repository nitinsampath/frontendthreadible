import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './Editor';
import User from './User';

class App extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        cells: this.props.cells,
        user: this.props.user
      };
  }
  
  /*
  @param code - The string representing the code in the cell to be added.  
  */
  addCell(code) {
    //TODO: make request to node server to add cell to workspace.
    this.state.cells.push({code: code, output: null});
    this.setState({cells: this.state.cells});
  }
  render() {
    var cellNodes = this.state.cells.map(function(cell) {
       return (
           <Cell code={cell.code} output={cell.output} />
       ); 
    });
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <User name = "Nitin" pic="./head.jpeg" />
        <div className="cell-list">
        </div>
        <NewCell addCell={this.addCell.bind(this)} />
      </div>
    );
  }
}

export default App;
