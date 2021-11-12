import axios from 'axios';

// ACTION TYPES

const GET_SHOPPING_CART = 'GET_SHOPPING_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'

// ACTION CREATORS

const getShoppingCart = (data) => {
  return {
    type: GET_SHOPPING_CART,
    cart: data
  }
}

export const addItemToCart = (product, amount) => {
  return {
    type: ADD_ITEM_TO_CART,
    product: product,
    amount: amount
  }
}

// THUNKS

export const fetchShoppingCart = () => async(dispatch) => {
  try{
    const token = window.localStorage.getItem("token");
    const {data} = await axios.get('/api/shoppingcart', {
      headers: {
        authorization: token
      }
    })
    dispatch(getShoppingCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const postItemToCart = (id, amount) => async(dispatch) => {
  try {
    const token = window.localStorage.getItem("token")
    if (token) {
      const {data} = await axios.post(`/api/shoppingcart:${id}`, {
        quantity: amount,
        headers: {
          authorization: token
        }
      })
      dispatch(addItemToCart(data, amount))
    } else {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(addItemToCart(data, amount))
    }
  } catch (error) {
    console.log(error)
  }
}

// INITIAL STATE

const initialState = []

// REDUCER

const reducer = (state = initialState, action) => {

  const stateByIDs = state.map(product => product.id)

  switch(action.type) {
    case GET_SHOPPING_CART:
      return action.cart
    // need some logic for ADD ITEM to cover both logged in and guest users.
    case ADD_ITEM_TO_CART:
      let idxOfItem = stateByIDs.findIndex(action.product.id)
      if (idxOfItem) {
        state[idxOfItem].shoppingCart.quantity += action.amount
        return state
      } else {
        //  This sets up a property on the incoming item to mimic what you would get if you used an api route and Eager Loading
        action.product.shoppingCart.quantity = action.amount
        return [...state, action.product]
      }
    default:
      return state
  }
}

export default reducer;
