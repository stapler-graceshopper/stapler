import axios from 'axios'

// ACTION TYPES

const GET_USER_PRODUCTS = 'GET_USER_PRODUCTS'

// ACTION CREATORS

const getAllUserProducts = (userProducts) => {
  return {
    type: GET_USER_PRODUCTS,
    userProducts
  }
}

// THUNKS

export const fetchAllUserProducts = () => async(dispatch) => {
  const token = window.localStorage.getItem('token');

  const {data: userProducts} = await axios.get(`/api/cart`, {
    headers: {
      authorization: token
    }
  })
  dispatch(getAllUserProducts(userProducts.products))
}

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_PRODUCTS:
      return action.userProducts
    default:
      return state
  }
}

export default reducer
