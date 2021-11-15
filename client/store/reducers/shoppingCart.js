import axios from "axios";

// ACTION TYPES

const GET_SHOPPING_CART = "GET_SHOPPING_CART";
const UPDATE_ITEM_IN_CART = "UPDATE_ITEM_IN_CART";
const DELETE_ITEM_IN_CART = "DELETE_ITEM_IN_CART";
const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
const CLEAR_CART = 'CLEAR_CART'

// ACTION CREATORS

const getShoppingCart = items => {
  return {
    type: GET_SHOPPING_CART,
    cart: items,
  };
};

const deleteItemFromCart = itemId => {
  return {
    type: DELETE_ITEM_IN_CART,
    itemId,
  };
};

const updateItemFromCart = (itemId, quantity) => {
  return {
    type: UPDATE_ITEM_IN_CART,
    itemId,
    quantity,
  };
};

const addItemToCart = (item, quantity) => {
  return {
    type: ADD_ITEM_TO_CART,
    item,
    quantity,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
    cart: []
  }
}

// THUNKS

export const fetchShoppingCart = () => async dispatch => {
  try {
    const token = window.localStorage.getItem("token");

    if (token) {
      const { data } = await axios.get("/api/shoppingcart", {
        headers: {
          authorization: token,
        },
      });
      dispatch(getShoppingCart(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const postItemToCart = (id, amount, history) => async dispatch => {
  try {
    const token = window.localStorage.getItem("token");

    const { data: item } = await axios.get(`/api/products/${id}`);

    if (token) {
      const { data: cart } = await axios.post(
        `/api/shoppingCart/${id}`,
        { quantity: amount },
        {
          headers: {
            authorization: token,
          },
        }
      );

      item.shoppingCart = cart.quantity;

      dispatch(addItemToCart(item, amount));
    } else {
      item.shoppingCart = { quantity: amount };

      dispatch(addItemToCart(item, amount));
    }

    history.push("/shoppingCart");
  } catch (error) {
    console.log(error);
  }
};

export const updateItemInCart = (id, amount) => async dispatch => {
  try {
    const token = window.localStorage.getItem("token");

    if (token) {
      await axios.put(
        `/api/shoppingCart/${id}`,
        { quantity: amount },
        {
          headers: {
            authorization: token,
          },
        }
      );
    }
    dispatch(updateItemFromCart(id, amount));
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemInCart = id => async dispatch => {
  try {
    const token = window.localStorage.getItem("token");

    if (token) {
      await axios.delete(`/api/shoppingCart/${id}`, {
        headers: {
          authorization: token,
        },
      });
    }

    dispatch(deleteItemFromCart(id));
  } catch (error) {
    console.log(error);
  }
};

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOPPING_CART:
      return action.cart;
    case DELETE_ITEM_IN_CART:
      return [...state.filter(product => product.id !== action.itemId)];
    case ADD_ITEM_TO_CART:
      {const newItem = {
        ...action.item,
        shoppingCart: { quantity: Number(action.quantity) },
      };

      return [...state, newItem];}
    case UPDATE_ITEM_IN_CART:
      {const newState = state.map(product => {
        if (product.id === action.itemId) {
          const newProduct = { ...product };

          newProduct.shoppingCart = { quantity: Number(action.quantity) };

          return newProduct;
        } else {
          return product;
        }
      });
      return newState;}
    case CLEAR_CART:
      return action.cart
    default:
      return state;
  }
};

export default reducer;
