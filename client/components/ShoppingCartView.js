import React from 'react'
import {connect} from 'react-redux'
import { fetchShoppingCart, deleteItemInCart, checkoutCart } from '../store/reducers/shoppingCart'
import ProductInsideCart from './productInsideCart'


class ShoppingCartView extends React.Component{
  constructor() {
    super()

    this.handleDelete = this.handleDelete.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.fetchShoppingCart()
  }

  handleDelete(evt, id) {
    evt.preventDefault()
    this.props.deleteItem(id)
  }

  handleCheckout(evt) {
    evt.preventDefault();
    this.props.checkoutCart();
  }

  render() {
    return(
      <div>
        <h2 className="flex">This is your shopping cart</h2>
        {this.props.user.type ? <button onClick={this.handleCheckout}>Checkout</button> : null}
        <br/>
        <h2>This is your shopping cart</h2>
        {this.props.shoppingCart.map(product => (
            <ProductInsideCart key={product.id} product={product} handleDelete={this.handleDelete}/>
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

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    fetchShoppingCart: () => dispatch(fetchShoppingCart()),
    deleteItem: (id) => dispatch(deleteItemInCart(id)),
    checkoutCart: () => dispatch(checkoutCart(history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartView)
