import React from "react";
import { connect } from "react-redux";

class User extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <img src={this.props.user.image}/>
        <h1>Username: {this.props.user.username}</h1>
        <h1>Email: {this.props.user.email}</h1>
        <h1>Address: {this.props.user.address}</h1>
      </div>
    );
  }
}

const mapState = state => {
  return { user: state.auth };
};

export default connect(mapState)(User);
