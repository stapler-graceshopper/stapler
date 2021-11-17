import axios from "axios";
import { authenticateRequest } from "../gatekeepingMiddleware";

// ACTION TYPES

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_SELECTED = "DELETE_SELECTED";

// ACTION CREATORS

const getAllProducts = data => {
  return {
    type: GET_PRODUCTS,
    products: data,
  };
};

const getProductsByCategory = data => {
  return {
    type: GET_PRODUCTS_BY_CATEGORY,
    products: data,
  };
};

const addProduct = data => {
  return {
    type: ADD_PRODUCT,
    product: data,
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

export const fetchProductsByCategory = category => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/byCategory/${category}`);
    dispatch(getProductsByCategory(data));
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = product => async dispatch => {
  try {
    const newProduct = await authenticateRequest(
      "post",
      `/api/products`,
      product
    );

    if (newProduct) {
      dispatch(addProduct(newProduct));
    }
  } catch (error) {
    console.log(error);
  }
};

// INITIAL STATE

const initialState = [];

// REDUCER

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCTS_BY_CATEGORY:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT: {
      {
        let newState = [...state];
        newState = newState.filter(product => {
          return product.id !== action.product.id;
        });
        newState.push(action.product);
        return newState;
      }
    }
    case DELETE_SELECTED:
      return [...state].filter(product => product.id !== action.id);
    default:
      return state;
  }
};

export default reducer;
