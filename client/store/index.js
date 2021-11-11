import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import products from './reducers/products'
import selectedProduct from './reducers/selectedProduct'
import users from './reducers/users'
import cart from './reducers/cart'

const reducer = combineReducers({
  auth,
  products,
  selectedProduct,
  users,
  cart
  })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
