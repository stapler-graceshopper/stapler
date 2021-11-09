import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS

const getProducts = (data) => {
  return {
    type: GET_PRODUCTS,
    products: data
  }
}

// THUNKS

export const fetchProducts = () => async(dispatch) => {
  const {data} = await axios.get('/api/products')
  dispatch(getProducts(data))
}

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_PRODUCTS:
      return action.data

    default:
      return state
  }
}

export default reducer
