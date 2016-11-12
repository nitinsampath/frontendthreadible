import React, { Component } from 'react';


class User extends Component {
  render() {
    return (
      <div className="User" >
        
        <div><img src={this.props.pic}  /> User: {this.props.name}</div>
       
      </div>
    );
  }
}

export default User;