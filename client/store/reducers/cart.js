import axios from 'axios'

// ACTION TYPES

const GET_USER_PRODUCTS = 'GET_USER_PRODUCTS'

// ACTION CREATORS

const getAllUserProducts = (products) => {
  return {
    type: GET_USER_PRODUCTS,
    products
  }
}

// THUNKS

export const fetchAllUserProducts = () => async(dispatch) => {
  const token = window.localStorage.getItem('token');

  const {data: products} = await axios.get(`/api/cart`, {
    headers: {
      authorization: token
    }
  })
  dispatch(getAllUserProducts(products))
}

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default reducer
