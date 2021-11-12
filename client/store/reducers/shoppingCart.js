import axios from "axios";

// ACTION TYPES

const GET_SHOPPING_CART = "GET_SHOPPING_CART";
const DELETE_ITEM_IN_CART = "DELETE_ITEM_IN_CART";
const ADD_ITEM_TO_CART_AS_GUEST = "ADD_ITEM_TO_CART_AS_GUEST";
const UPDATE_ITEM_AS_GUEST = 'UPDATE_ITEM_AS_GUEST'

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

const addItemToCartAsGuest = (item, quantity) => {
  return {
    type: ADD_ITEM_TO_CART_AS_GUEST,
    item,
    quantity,
  };
};

const updateItemAsGuest = (itemId, quantity) => {
  return {
    type: UPDATE_ITEM_AS_GUEST,
    itemId,
    quantity,
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

    if (token) {
      await axios.post(
        `/api/shoppingCart/${id}`,
        { quantity: amount },
        {
          headers: {
            authorization: token,
          },
        }
      );

      fetchShoppingCart();
    } else {
      const { data: item } = await axios.get(`/api/products/${id}`);

      dispatch(addItemToCartAsGuest(item, amount));
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

      fetchShoppingCart();
    } else {
      dispatch(updateItemAsGuest(id, amount))
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemInCart = id => async dispatch => {
  try {
    const token = window.localStorage.getItem("token");

    await axios.delete(`/api/shoppingCart/${id}`, {
      headers: {
        authorization: token,
      },
    });

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
    case ADD_ITEM_TO_CART_AS_GUEST:
      const newItem = {
        ...action.item,
        shoppingCart: { quantity: action.quantity },
      };
      return [...state, newItem];
    case UPDATE_ITEM_AS_GUEST:
      const newState = state.map(product => {
        if (product.id === action.itemId) {
          const newProduct = {...product}

          newProduct.shoppingCart = {quantity: Number(action.quantity)}

          return newProduct
        } else {
          return product
        }
      })

      return newState
    default:
      return state;
  }
};

export default reducer;
