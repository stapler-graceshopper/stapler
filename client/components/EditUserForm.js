import React from "react";
import { connect } from "react-redux";
import { clearUser, modifyUser ,removeUser } from "../store/reducers/selectedUser";
import AllUsersTable from "./AllUsersTable";
import { fetchAllUsers } from "../store/reducers/users";

const clearEmptyObjectKeys = (obj) => {
  try {
    Object.keys(obj).forEach(key => {
      if (obj[key] === '' || key === 'err') {
        delete obj[key]
      }
    })
  } catch (err) {
    console.log(err)
  }
}

class EditUserForm extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      username: "",
      email: "",
      address: "",
    }
  }

  componentDidMount() {
    this.props.clearUser()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.props.selectedUser.id) {
      const editedUser = {
        id: this.props.selectedUser.id,
        username: this.state.username,
        email: this.state.email,
        address: this.state.address
      }
      clearEmptyObjectKeys(editedUser)
      // JOE_CR: !!!!!!!!!!!!!!!!!! How else can you get your logging to stand out?
      console.log('!!!!!!!!',editedUser.id)
      await this.props.modifyUser(editedUser.id, editedUser)
      // JOE_CR: Why a call to the fetchAllUsers() again?
      await this.props.fetchAllUsers();
      this.setState({
        username: "",
        email: "",
        address: ""
      })
    } else {
      console.log('select a user before submitting changes')
    }
  }

  handleDelete() {
    if (this.props.selectedUser.type !== 'admin') {
      this.props.removeUser(this.props.selectedUser.id)
    } else {
      // JOE_CR: Nice!
      console.log('Cannot remove Admin Users')
    }
  }

  render() {
    const {username, email, address} = this.state
    const {handleChange, handleSubmit, handleDelete} = this

    if (this.props.user.type === 'admin') {
      return (
        <div>
          {this.props.selectedUser.id ?
        <div>
          <h3>User Name: {this.props.selectedUser.username}</h3>
          <img src={this.props.selectedUser.image}/> <br /> <br />
          <span>Privleges: {this.props.selectedUser.type}</span> <br />
          <span>Email Address: {this.props.selectedUser.email}</span> <br />
          <span>Address: {this.props.selectedUser.address}</span> <br />
        </div>
        :
        <div>
        <h3>No User Selected</h3>
        <h3>Choose A User From The Table Below</h3>
      </div>
        }
        <hr />
        <hr />
        <h3>Edit Selected User</h3>
        <h4>NOTE: ADMINS MAY ONLY EDIT NON ADMIN ACCOUNTS!</h4>
        <form id ="EditUserForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Change User Name</label>
          <input type="text" onChange={handleChange} name="username" value={username} />

          <label htmlFor="email">Change User Email</label>
          <input type="text" onChange={handleChange} name="email" value={email} />

          <label htmlFor="address">Change User Address</label>
          <input type="text" onChange={handleChange} name="address" value={address} />

          <br />

          <button type="submit">Submit</button>
        </form>
          <hr />
          <hr />
          <button type="button" onClick={handleDelete}> DELETE USER </button>
          <hr />
          <hr />
          <h3>AllUsersTable</h3>
          <AllUsersTable/>


        </div>
      )
    } else {
      return <div>bad token</div>
    }
  }
}



const mapStateToProps = (state) => {
  return {
    selectedUser: state.selectedUser,
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => dispatch(clearUser()),
    modifyUser: (id, user) => dispatch(modifyUser(id, user)),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    removeUser: (id) => dispatch(removeUser(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm)
