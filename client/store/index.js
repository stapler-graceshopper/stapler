import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "./reducers/products";
import selectedProduct from "./reducers/selectedProduct";
import users from "./reducers/users";
import shoppingCart from "./reducers/shoppingCart";
import cartHistory from "./reducers/cartHistory";
import categories from "./reducers/categories";
import selectedUser from "./reducers/selectedUser";

const reducer = combineReducers({
  auth,
  shoppingCart,
  products,
  selectedProduct,
  selectedUser,
  users,
  cartHistory,
  categories,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
