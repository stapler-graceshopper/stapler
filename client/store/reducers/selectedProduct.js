import axios from 'axios'

// ACTION TYPES

const GET_SELECTED_PRODUCT = 'GET_SELECTED_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// ACTION CREATORS

const getSingleProduct = (product) => {
  return {
    type: GET_SELECTED_PRODUCT,
    product: product
  }
}

const updateProduct = (data) => {
  return {
    type: UPDATE_PRODUCT,
    product: data
  }
}

// THUNKS

export const fetchSingleProduct = (id) => async(dispatch) => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(getSingleProduct(data))
}

export const fetchModifiedProduct = (product) => async(dispatch) => {
  const token = window.localStorage.getItem('token')
  const {data} = await axios.put(`/api/products/` , product, {
    headers: {
      authorization: token
    }
  })
  dispatch(updateProduct(data))
}

// INITIAL STATE

const initialState = {}

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SELECTED_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default reducer
