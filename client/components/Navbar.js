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
        <div className="nav">
          {/* The navbar will show these links after you log in */}
          <Link to="/home"className="link">Home</Link>
          <Link to="/user" className="link">User Info</Link>
          <Link to="/products" className="link">Products</Link>
          <Link to="/shoppingCart" className="link">Shopping Cart</Link>
          <img src="STAPLER.png" id="logo"/>
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
          <Link to="/editProduct">Edit Product</Link> :
          null}
          {userType === 'admin' ?
          <Link to="/editUser">Edit User</Link> :
          null}

          <a href="#" onClick={handleClick} className="link">
            Logout
          </a>
        </div>
      ) : (
        <div className="nav">
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="link">Login</Link>
          <Link to="/signup" className="link">Sign Up</Link>
          <img src="STAPLER.png" id="logo"/>
          <Link to="/products" className="link">Products</Link>
          <Link to="/shoppingCart" className="link">Shopping Cart</Link>
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
