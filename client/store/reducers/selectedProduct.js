import axios from 'axios'

// ACTION TYPES

const GET_SELECTED_PRODUCT = 'GET_SELECTED_PRODUCT'

// ACTION CREATORS

const getSingleProduct = (product) => {
  return {
    type: GET_SELECTED_PRODUCT,
    product: product
  }
}

// THUNKS

export const fetchSingleProduct = (id) => async(dispatch) => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(getSingleProduct(data))
}
// INITIAL STATE

const initialState = {}

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SELECTED_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default reducer
