import React from 'react'
import {connect} from 'react-redux'
import { fetchShoppingCart } from '../store/reducers/shoppingCart'
import ProductInsideCart from './productInsideCart'

class ShoppingCartView extends React.Component{
  constructor() {
    super()
  }

  componentDidMount() {
    if (!this.props.user.type === 'guest') {
    this.props.fetchShoppingCart()
    } else {

    }
  }

  render() {
    console.log(this.props.shoppingCart)

    return(
      <div>
        <h2>This is your shopping cart</h2>
        {this.props.shoppingCart.map(product => (
            <ProductInsideCart key={product.id} product={product} />
          )
        )}
      </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    shoppingCart: state.shoppingCart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShoppingCart: () => dispatch(fetchShoppingCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartView)
