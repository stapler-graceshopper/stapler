import React from "react";
import { connect } from "react-redux";
import { modifySelf } from "../store/reducers/selectedUser";

const clearEmptyObjectKeys = obj => {
  try {
    Object.keys(obj).forEach(key => {
      if (obj[key] === "" || key === "err") {
        delete obj[key];
      }
    });
  } catch (err) {
    console.log(err);
  }
};

class User extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      address: "",
      email: "",
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const editedUser = {
      username: this.state.username,
      email: this.state.email,
      address: this.state.address,
    };
    clearEmptyObjectKeys(editedUser);
    this.props.modifySelf(editedUser);
    this.setState({
      username: "",
      email: "",
      address: "",
    });
  }

  render() {
    const { username, email, address } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div className="user">
        <img src={this.props.user.image} />
        <div className="info">
          <h1>Username: {this.props.user.username}</h1>
          <h1>Email: {this.props.user.email}</h1>
          <h1>Address: {this.props.user.address}</h1>
        </div>

        <form id="EditUserForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Change User Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="username"
            value={username}
          />

          <label htmlFor="email">Change User Email</label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            value={email}
          />

          <label htmlFor="address">Change User Address</label>
          <input
            type="text"
            onChange={handleChange}
            name="address"
            value={address}
          />

          <br />

          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    modifySelf: update => dispatch(modifySelf(update)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
