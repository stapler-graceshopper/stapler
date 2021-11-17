// eslint-disable-next-line no-unused-vars
import React from 'react'
import {connect} from 'react-redux'
// eslint-disable-next-line no-unused-vars
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {clearCart} from '../store/reducers/shoppingCart'

const Navbar = ({handleClick, isLoggedIn, userType}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          <div className="center">
            <img src="STAPLER.png" id="logo"/>
          </div>
          <div className="nav">
            {/* The navbar will show these links after you log in */}
            <Link to="/home"className="link">Home</Link>
            <Link to="/user" className="link">User Info</Link>
            <Link to="/products" className="link">Products</Link>
            <Link to="/shoppingCart" className="link">Shopping Cart</Link>
            <Link to='/shoppingCart/history' className="link">Purchase History</Link>

            {/* Admin links */}
            {userType === 'admin' ?
            <Link to="/AllUsers" className="link">All Users</Link> :
            null}
            {userType === 'admin' ?
            <Link to="/create" className="link">Create Product</Link> :
            null}
            {userType === 'admin' ?
            <Link to="/category" className="link">View Categories</Link> :
            null}
            {userType === 'admin' ?
            <Link to="/editProduct" className="link">Edit Product</Link> :
            null}
            {userType === 'admin' ?
            <Link to="/editUser" className="link">Edit User</Link> :
            null}

            <a href="#" onClick={handleClick} className="link">
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div>
          <div className="center">
            <img src="STAPLER.png" id="logo"/>
          </div>
          <div className="nav">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="link">Login</Link>
            <Link to="/signup" className="link">Sign Up</Link>
            <Link to="/products" className="link">Products</Link>
            <Link to="/shoppingCart" className="link">Shopping Cart</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    userType: state.auth.type,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
