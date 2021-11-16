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
