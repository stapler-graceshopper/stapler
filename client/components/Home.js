// eslint-disable-next-line no-unused-vars
import React from "react";
import { connect } from "react-redux";

export const Home = props => {
  const { username } = props;

  return (
    <div>
      <h3 className="flex">Welcome, {username}</h3>
    </div>
  );
};

const mapState = state => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
