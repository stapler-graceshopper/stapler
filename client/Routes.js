import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import User from './components/User'
import AllProducts from './components/AllProducts';
import AddProductForm from './components/AddProductForm';
import SelectedProductView from './components/SelectedProductView';
import AllUsers from './components/AllUsers'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    const allUsersPath = this.props.userType === 'admin' ? <Route path="/AllUsers" component={AllUsers} /> : null
    const createProductPath = this.props.userType === 'admin' ? <Route path="/create" component={AddProductForm} /> : null

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/user" component={User} />
            <Route path="/home" component={Home} />
            <Route exact path="/products/:productId" component={SelectedProductView} />
            <Route path="/products" component={AllProducts} />

            {/* Admin routes */}
            {allUsersPath}
            {createProductPath}

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products/:productId" component={SelectedProductView} />
            <Route path="/products" component={AllProducts} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    userType: state.auth.type
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
