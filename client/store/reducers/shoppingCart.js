import axios from 'axios';

// ACTION TYPES

const GET_SHOPPING_CART = 'GET_SHOPPING_CART'

// ACTION CREATORS

const getShoppingCart = (data) => {
  return {
    type: GET_SHOPPING_CART,
    cart: data
  }
}

// THUNKS

// INITIAL STATE

const initialState = []

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SHOPPING_CART:
      return action.cart
    default:
      return state
  }
}

export default reducer;
