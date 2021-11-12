import axios from 'axios';

// ACTION TYPES

const GET_SHOPPING_CART = 'GET_SHOPPING_CART'
const DELETE_ITEM_IN_CART = 'DELETE_ITEM_IN_CART'

// ACTION CREATORS

const getShoppingCart = (items) => {
  return {
    type: GET_SHOPPING_CART,
    cart: items
  }
}

const deleteItemFromCart = (itemId) => {
  return {
    type: DELETE_ITEM_IN_CART,
    itemId
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

export const postItemToCart = (id, amount, history) => async(dispatch) => {
  try {
    const token = window.localStorage.getItem("token")

    await axios.post(`/api/shoppingCart/${id}`, {quantity: amount}, {
      headers: {
        authorization: token
      }
    })

    fetchShoppingCart()
    history.push('/shoppingCart')
  } catch (error) {
    console.log(error)
  }
}

export const updateItemInCart = (id, amount) => async dispatch => {
  try {
    const token = window.localStorage.getItem("token")

    await axios.put(`/api/shoppingCart/${id}`, {quantity: amount}, {
      headers: {
        authorization: token
      }
    })

    fetchShoppingCart()
  } catch (error) {
    console.log(error)
  }
}

export const deleteItemInCart = (id) => async dispatch => {
  try {
    const token = window.localStorage.getItem("token")

    await axios.delete(`/api/shoppingCart/${id}`, {
      headers: {
        authorization: token
      }
    })

    dispatch(deleteItemFromCart(id))
  } catch (error) {
    console.log(error)
  }
}

// INITIAL STATE

const initialState = []

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SHOPPING_CART:
      return action.cart
    case DELETE_ITEM_IN_CART:
      return [...state.filter(product => product.id !== action.itemId)]
    default:
      return state
  }
}

export default reducer;
