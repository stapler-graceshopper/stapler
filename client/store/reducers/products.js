import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS

const getAllProducts = (data) => {
  return {
    type: GET_PRODUCTS,
    products: data
  }
}

// THUNKS

export const fetchAllProducts = () => async(dispatch) => {
  const {data} = await axios.get('/api/products')
  dispatch(getAllProducts(data))
}

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default reducer
