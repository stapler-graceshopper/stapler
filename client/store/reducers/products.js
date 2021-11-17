import axios from "axios";

// ACTION TYPES

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_BY_CATEGORY = "GET_PRODUCTS_BY_CATEGORY"
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

const getProductsByCategory = (data) => {
  return {
    type: GET_PRODUCTS_BY_CATEGORY,
    products: data
  }
}

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

export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/products/byCategory/${category}`)
    dispatch(getProductsByCategory(data))
  } catch (error) {
    console.log(error)
  }
}

// JOE_CR: ToBo
export const fetchProductToBoDeleted = id => async () => {
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
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCTS_BY_CATEGORY:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case DELETE_PRODUCT:
      return action.products;
    // case UPDATE_PRODUCT: {
    //   const newState = [...state]
    //   newState.filter(product => {
    //     return product.id !== action.product.id;
    //   })
    //   newState.push(action.product);
    //   return newState;
    // }
    default:
      return state;
  }
};

export default reducer;
