import axios from 'axios'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'

const DELETE_PRODUCT = 'DELETE_PRODUCT';

const ADD_PRODUCT = 'ADD_PRODUCT';
// ACTION CREATORS

const getAllProducts = (data) => {
  return {
    type: GET_PRODUCTS,
    products: data
  }
}

const addProduct = (data) => {
  return {
    type: ADD_PRODUCT,
    product: data
  }
}

const deleteProduct = (id) => {
  return{
    type: DELETE_PRODUCT,
    productId: id
  }
}
// THUNKS

export const fetchAllProducts = () => async(dispatch) => {
  const {data} = await axios.get('/api/products')
  dispatch(getAllProducts(data))
}

export const fetchProductToBoDeleted = (id) => async(dispatch) => {
  const {data} = await axios.get(`/api/products/${id}`)
  await data.destroy();
  fetchAllProducts()
}

export const createProduct = (data) => async(dispatch) => {
  const product = await axios.post(`/api/products`, data)
  dispatch(addProduct(product))
}
// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return action.products
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default reducer
