import React, { Component } from 'react';


class Cell extends Component {
  render() {
    //leaving out the output for now b/c not sure what form it will take yet. could be text or an image.
    return (
      <div className="cell" >
        <textarea>
          {this.props.code}
        </textarea>
        
      </div>
    );
  }
}

export default Cell;