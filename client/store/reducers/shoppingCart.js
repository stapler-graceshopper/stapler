import axios from 'axios';

// ACTION TYPES

const GET_SHOPPING_CART = 'GET_SHOPPING_CART'

// ACTION CREATORS

const getShoppingCart = (items) => {
  return {
    type: GET_SHOPPING_CART,
    cart: items
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

//might not work because of how body and header is sent
export const postItemToCart = (id, amount, history) => async(dispatch) => {
  try {
    const token = window.localStorage.getItem("token")

    console.log(token)
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


// INITIAL STATE

const initialState = []

// REDUCER

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SHOPPING_CART:
      return action.cart
    default:
      return state
  }
}

export default reducer;
