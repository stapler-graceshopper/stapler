import React from "react";
import { connect } from "react-redux";
import { fetchAllUsers } from "../store/reducers/users"

class AllUsers extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        {this.props.users.map(user => {
    return (
      <div key={user.id}>
        <img src={user.image}/>
        <h1>Username: {user.username}</h1>
        <h1>Email: {user.email}</h1>
        <h1>Address: {user.address}</h1>
      </div>
    )
  })}
      </div>
    );
  }
}

const mapState = state => {
  return { users: state.users };
};

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers);
