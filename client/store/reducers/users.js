import axios from "axios";
import { authenticateRequest } from "../gatekeepingMiddleware";

// ACTION TYPES

const GET_USERS = "GET_USERS";

// ACTION CREATORS

const getAllUsers = users => {
  return {
    type: GET_USERS,
    users,
  };
};

// THUNKS

export const fetchAllUsers = () => async dispatch => {
  try {
    const users = await authenticateRequest("get", `/api/users`);

    if (users) {
      dispatch(getAllUsers(users));
    }
  } catch (error) {
    console.log(error);
  }
};

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};

export default reducer;
