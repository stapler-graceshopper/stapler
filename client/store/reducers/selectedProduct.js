import axios from "axios";
import { authenticateRequest } from "../gatekeepingMiddleware";

// ACTION TYPES

const GET_SELECTED_PRODUCT = "GET_SELECTED_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const CLEAR_SELECTED = "CLEAR_SELECTED";
const DELETE_SELECTED = "DELETE_SELECTED";

// ACTION CREATORS

const getSingleProduct = product => {
  return {
    type: GET_SELECTED_PRODUCT,
    product: product,
  };
};

const updateProduct = data => {
  return {
    type: UPDATE_PRODUCT,
    product: data,
  };
};

export const clearSelectedProduct = () => {
  return {
    type: CLEAR_SELECTED,
  };
};

const deleteProduct = id => {
  return {
    type: DELETE_SELECTED,
    id,
  };
};

// THUNKS

export const fetchSingleProduct = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(getSingleProduct(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchModifiedProduct = product => async dispatch => {
  try {
    const updatedProduct = await authenticateRequest(
      "put",
      `/api/products/`,
      product
    );

    if (updatedProduct) {
      dispatch(updateProduct(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = id => async dispatch => {
  try {
    const res = await authenticateRequest("delete", `/api/products/${id}`);

    if (res.status === 202) {
      dispatch(deleteProduct(id));
    } else {
      console.log("OOPS, something went wrong while attempting to delete");
    }
  } catch (error) {
    console.log(error);
  }
};

// INITIAL STATE

const initialState = {};

// REDUCER

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
    case CLEAR_SELECTED:
      return {};
    case DELETE_SELECTED:
      return {};
    default:
      return state;
  }
};

export default reducer;
