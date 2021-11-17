import React from "react";
import { connect } from "react-redux"
import { fetchAllUsers } from '../store/reducers/users'
import { fetchUser } from "../store/reducers/selectedUser";

class AllUsersTable extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  handleSelectUser(id) {
    this.props.fetchUser(id)
  }

  render() {

    const users = this.props.users.sort(((a,b)=>(a.id > b.id ? 1 : -1)))

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>User Type</th>
              <th>Email Address</th>
              <th>Shipping Address</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user)=>(
              <tr key={user.id} >
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.type}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td onClick={(event) => this.handleSelectUser(event, user.id)}>Click to Select</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchUser: (id) => dispatch(fetchUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersTable);
