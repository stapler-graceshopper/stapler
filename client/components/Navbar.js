import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {clearCart} from '../store/reducers/shoppingCart'

// const allUsersPath = this.props.userType === 'admin' ? <Route path="/AllUsers" component={AllUsers} /> : null
const Navbar = ({handleClick, isLoggedIn, userType}) => (
  <div>
    <h1>FS-App-Template</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/user">User Info</Link>
          <Link to="/products">Products</Link>
          <Link to='/shoppingCart/history'>Purchase History</Link>
          <Link to="/shoppingCart">Shopping Cart</Link>

          {/* Admin links */}
          {userType === 'admin' ?
          <Link to="/AllUsers">All Users</Link> :
          null}
          {userType === 'admin' ?
          <Link to="/create">Create Product</Link> :
          null}

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Products</Link>
          <Link to="/shoppingCart">Shopping Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
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
