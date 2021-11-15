import axios from "axios";

// ACTION TYPES

const GET_PRODUCTS = "GET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// ACTION CREATORS

const getAllProducts = data => {
  return {
    type: GET_PRODUCTS,
    products: data,
  };
};

const addProduct = data => {
  return {
    type: ADD_PRODUCT,
    product: data,
  };
};

const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    productId: id,
  };
};

// THUNKS

export const fetchAllProducts = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/products");
    dispatch(getAllProducts(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductToBoDeleted = id => async dispatch => {
  try {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.get(`/api/products/${id}`, {
      headers: {
        authorization: token,
      },
    });
    await data.destroy();
    fetchAllProducts();
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = product => async dispatch => {
  try {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.post(`/api/products`, product, {
      headers: {
        authorization: token,
      },
    });
    dispatch(addProduct(data));
  } catch (error) {
    console.log(error);
  }
};

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return action.products;
    case GET_PRODUCTS:
      return action.products;
    case UPDATE_PRODUCT:
      return [...state]
        .filter(product => {
          return product.id !== action.product.id;
        })
        .push(action.product);
    default:
      return state;
  }
};

export default reducer;
