// eslint-disable-next-line no-unused-vars
import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  if (name === "signup") {
    return (
      <div className="flex">
        <form onSubmit={handleSubmit} name={name} id="form">
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" className="input" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" className="input" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" className="input" />
          </div>
          <div>
            <label htmlFor="image">
              <small>Image</small>
            </label>
            <input name="image" type="text" className="input" />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input name="address" type="text" className="input" />
          </div>
          <div>
            <button type="submit" className="button">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <form onSubmit={handleSubmit} name={name} id="form">
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" className="input" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" className="input" />
          </div>
          <div>
            <button type="submit" className="button">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email ? evt.target.email.value : "";
      const image = evt.target.image ? evt.target.image.value : "";
      const address = evt.target.address ? evt.target.address.value : "";
      dispatch(
        authenticate({ username, password, email, image, address }, formName)
      );
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
