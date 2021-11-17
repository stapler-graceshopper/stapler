import axios from "axios";

// ACTION TYPES

const GET_CART_HISTORY = 'GET_CART_HISTORY';


// ACTION CREATORS

const getCartHistory = items => {
  return {
    type: GET_CART_HISTORY,
    history: items,
  };
};

// THUNKS

export const fetchCartHistory = () => async dispatch => {
  try {
    // JOE_CR: I have to imagine you have a lot of thunks that are doing this:
    // access token from localstorage -> include it as a header on your request.
    // Can you think of ways to centralize this utility and never have to write it
    // more than once?
    const token = window.localStorage.getItem("token");

    if (token) {
      const { data: history } = await axios.get("/api/shoppingCart/history", {
        headers: {
          authorization: token,
        },
      });
      dispatch(getCartHistory(history));
    }
  } catch (error) {
    console.log(error);
  }
};

//REDUCER

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_HISTORY:
      return action.history
    default:
      return state
  }
}

export default reducer
