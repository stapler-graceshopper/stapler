import axios from 'axios';

// ACTION TYPES

const GET_SHOPPING_CART = 'GET_SHOPPING_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const DELETE_ITEM_IN_CART = 'DELETE_ITEM_IN_CART'

// ACTION CREATORS

const getShoppingCart = (items) => {
  return {
    type: GET_SHOPPING_CART,
    cart: items
  }
}

const addItemToCart = (item, amount) => {
  return {
    type: ADD_ITEM_TO_CART,
    item,
    amount
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
    if (token) {
    await axios.post(`/api/shoppingCart/${id}`, {quantity: amount}, {
      headers: {
        authorization: token
      }
    })

    fetchShoppingCart()
    history.push('/shoppingCart')
  } else {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(addItemToCart(data, amount))
    history.push('/shoppingCart')
  }
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

  const stateById = state.map(item => (item.id))

  switch(action.type) {
    case GET_SHOPPING_CART:
      return action.cart
    case ADD_ITEM_TO_CART:
      console.log('State', state)
       {
         if(stateById.includes(action.item.id)) {
        //  let idx = state.indexOf(action.item.id)
        //  const newState = [... state]
        //  newState[idx].shoppingCart.quantity = newState[idx].shoppingCart.quantity + action.amount
        //  return newState
        return [...state, action.item]
       } else {
        //  action.item.shoppingCart = {}
        //  action.item.shoppingCart.quantity = action.amount;
        // //  console.log('newState' , [...state, action.item])
        //  return [... state, action.item]
        return [...state, action.item]
       }
      }
    case DELETE_ITEM_IN_CART:
      return [...state.filter(product => product.id !== action.itemId)]
    default:
      return state
  }
}

export default reducer;
