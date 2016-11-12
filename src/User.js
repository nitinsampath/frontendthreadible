import React, { Component } from 'react';


class User extends Component {
  render() {
    return (
      <div className="User" >
        
        <div><img src={this.props.pic}  /> User: {this.props.name}</div>
        <textarea rows="4" cols="50"> </textarea>
      </div>
    );
  }
}

export default User;